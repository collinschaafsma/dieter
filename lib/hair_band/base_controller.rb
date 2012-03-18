module HairBand
  class BaseController < ActionController::Metal

    RENDERING_OPTIONS = [:status, :content_type]

    MODULES = [
      ActionController::ConditionalGet,
      ActionController::RackDelegation,
      ActionController::MimeResponds,
      AbstractController::Callbacks
    ]

    MODULES.each do |mixin|
      include mixin
    end

    around_filter :catch_exceptions
    before_filter :check_for_cached_response

    def check_for_cached_response
      cached_data = get_cached_data
      Rails.logger.debug("Response from cache.") if cached_data
      return render_json cached_data if cached_data
    end

    def present(instance, options = {})
      presenter = presenter_class.new(self, instance)
      data = presenter.present(options)
      render_json data
      cache_data(data)
    end

    def presenter_class
      (self.class.name.gsub!('Controller', '').singularize + 'Presenter').constantize
    end

    def is_numeric?(obj)
      obj.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
    end

  private

    def cache_data(data)
      cache_client.set(cache_key, data)
    end

    def cache_key
      Digest::MD5.hexdigest(env["ORIGINAL_FULLPATH"])
    end

    def cache_client
      Dalli::Client.new('localhost:11211')
    end

    def get_cached_data
      cache_client.get(cache_key)
    end

    def render_json(json, options = {})
      self.status       = options[:status] if options[:status]
      self.content_type = options[:content_type] if options[:content_type]
      options = options.slice(*RENDERING_OPTIONS)
      json = ActiveSupport::JSON.encode(json) unless json.is_a?(String)
      self.status        ||= :ok
      self.content_type  ||= Mime::JSON
      self.response_body   = json
      headers['Content-Length'] = Rack::Utils.bytesize(json).to_s
    end

    def render_access_denied
      render_json( { :error => 'access denied' }, :status => 403 )
    end

    def render_error(msg, status=500)
      render_json( { error:  msg }, status: status )
    end

    def render_soft_error(msg, status=422)
      render_json( { error: msg }, status: status)
    end

    def catch_exceptions
      yield
    rescue ActiveRecord::RecordNotFound
      render_json( { :error => 'record not found' }, :status => 404)
    rescue Exception => e
      Rails.logger.debug '### EXCEPTION ###'
      Rails.logger.debug e.inspect
      Rails.logger.debug e.message.inspect
      Rails.logger.debug '### EXCEPTION BACKTRACE ###'
      e.backtrace.each { |l| Rails.logger.debug l.inspect }
      Rails.logger.debug '### /EXCEPTION ###'
      render_error e.message
    end
  end
end
