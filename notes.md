---
layout: page
title: Notes
permalink: /notes/
---

<h1 class="reveal">Notes</h1>

<p class="reveal" style="color:var(--text-soft);max-width:56ch;margin-bottom:2rem;">Course notes, problem-set write-ups, and learning resources from my undergrad. Shared in case they're useful to others.</p>

{% assign note_courses = site.notes | map: 'course' | uniq %}
{% for course in note_courses %}
<div class="note-group reveal">
  <h2>{{ course }}</h2>
  <div class="card-grid">
    {% assign course_notes = site.notes | where: 'course', course | sort: 'order' %}
    {% for note in course_notes %}
    <a class="card" href="{{ note.url | relative_url }}">
      <div class="card-title">{{ note.title }} <span class="arrow">↗</span></div>
      {% if note.description %}<div class="card-desc">{{ note.description }}</div>{% endif %}
    </a>
    {% endfor %}
  </div>
</div>
{% endfor %}
