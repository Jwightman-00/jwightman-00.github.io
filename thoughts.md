---
layout: page
title: Thoughts
permalink: /thoughts/
---

<h1>Thoughts</h1>

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <span class="post-date">{{ post.date | date: "%Y %b %-d" }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
