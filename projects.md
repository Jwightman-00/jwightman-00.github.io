---
layout: page
title: Projects
permalink: /projects/
---

<h1 class="reveal">Projects</h1>
<p class="reveal" style="color:var(--text-soft);max-width:54ch;margin-bottom:2rem;">Things I've built, explored or tested; both in my and from my undergrad</p>

<div class="card-grid">
{% assign sorted_projects = site.projects | sort: 'date' | reverse %}
{% for project in sorted_projects %}
  <a class="card reveal" href="{{ project.url | relative_url }}" data-delay="{{ forloop.index0 | times: 60 }}">
    <div class="card-title">{{ project.title }} <span class="arrow">↗</span></div>
    <div class="card-meta">
      <span>{{ project.date | date: "%Y" }}</span>
      {% if project.tags %}{% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}{% endif %}
    </div>
    {% if project.description %}<div class="card-desc">{{ project.description }}</div>{% endif %}
  </a>
{% endfor %}
</div>
