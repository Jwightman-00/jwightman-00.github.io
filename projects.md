---
layout: page
title: Projects
permalink: /projects/
---

<h1>Projects</h1>

<ul class="item-list">
{% assign sorted_projects = site.projects | sort: 'date' | reverse %}
{% for project in sorted_projects %}
  <li>
    <a class="item-title" href="{{ project.url | relative_url }}">{{ project.title }}</a>
    <div class="item-meta">
      {{ project.date | date: "%Y" }}
      {% if project.tags %}
        &nbsp;&middot;&nbsp;
        {% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      {% endif %}
    </div>
    {% if project.description %}<div class="item-desc">{{ project.description }}</div>{% endif %}
  </li>
{% endfor %}
</ul>
