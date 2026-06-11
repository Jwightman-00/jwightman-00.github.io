---
layout: page
title: Thoughts
permalink: /thoughts/
---

<h1 class="reveal">Thoughts</h1>
<p class="reveal" style="color:var(--text-soft);max-width:54ch;margin-bottom:2rem;">Occasional writing — half-formed ideas, things I'm learning, and notes to my future self.</p>

<ul class="post-list reveal">
{% for post in site.posts %}
  <li>
    <span class="post-date">{{ post.date | date: "%Y %b %-d" }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
