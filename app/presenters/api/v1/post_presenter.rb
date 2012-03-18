class Api::V1::PostPresenter < Api::V1::BasePresenter
  def present_object(object, options = {})
    return object unless object.errors.empty? # Renders validation errors
    unless options[:include_root]
      if options[:minimal]
        {
          id: object.id,
          title: object.title
        }
      else
        object.as_json
      end
    else
      options.merge!(:include_root => false)
      { subject_class.to_sym => present_object(object, options) }
    end
  end
end
