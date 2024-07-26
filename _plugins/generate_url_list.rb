# _plugins/generate__url_list.rb
require 'json'

class IndexNowURLGenerator < Jekyll::Generator
  priority :lowest

  def generate(site)
    sorted_posts = site.posts.docs.sort_by { |post| post.data['lastmod'] || post.date }.reverse
    latest_posts = sorted_posts.take(5)

    url_list = latest_posts.map do |post|
      site.config['url'] + post.url.gsub('.html', '')
    end

    File.open(File.join(site.dest, 'url-list.json'), 'w') do |f|
      f.write(JSON.pretty_generate({ 'urlList' => url_list }))
    end
  end
end