class Api::V1::PostsController < Api::V1::BaseController
  def index
    @posts = Post.all
    present @posts, params
  end

  def show
    @post = Post.find(params[:id])
    present @post, params
  end
end
