---
layout: page
title: Notes
permalink: /notes/
---

<h1>Notes</h1>

<p style="font-size:0.9rem;color:#666;margin-bottom:2rem;">Course notes, problem set write-ups, and learning resources from my undergrad. Shared in case they're useful to others.</p>

{% assign note_courses = site.notes | map: 'course' | uniq %}
{% for course in note_courses %}
<h2>{{ course }}</h2>
<ul class="item-list">
  {% assign course_notes = site.notes | where: 'course', course | sort: 'order' %}
  {% for note in course_notes %}
  <li>
    <a class="item-title" href="{{ note.url | relative_url }}">{{ note.title }}</a>
    {% if note.description %}<div class="item-desc">{{ note.description }}</div>{% endif %}
  </li>
  {% endfor %}
</ul>
{% endfor %}
