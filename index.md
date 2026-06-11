---
layout: page
title: About
permalink: /
---

<section class="hero">
  <canvas id="particles" aria-hidden="true"></canvas>

  <span class="eyebrow"><span class="dot"></span> {{ site.author.affiliation }}</span>

  <h1>Hi, I'm <span class="gradient-text">Jenson</span>.</h1>

  <p class="hero-lead">
    I'm a <span class="typed-role" data-typed='["Part III physics student.","mathematician at heart.","builder of small things.","curious about everything."]'><span class="typed-text"></span><span class="cursor">&nbsp;</span></span>
  </p>

  <div class="hero-actions">
    <a class="btn btn-primary" href="{{ '/projects/' | relative_url }}">
      View projects
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
    <a class="btn btn-ghost" href="{{ '/cv/' | relative_url }}">Read my CV</a>
  </div>

  <div class="socials">
    <a href="https://github.com/Jwightman-00" target="_blank" rel="noopener" aria-label="GitHub">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.8c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
    </a>
    <a href="https://www.linkedin.com/in/jenson-wightman-3614361b4" target="_blank" rel="noopener" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
    </a>
  </div>
</section>

<section class="reveal">
  <p class="about-intro" style="font-size:1.08rem;color:var(--text-soft);max-width:60ch;">
    This site collects projects I've worked on, notes from my studies, and occasional writing on things I find interesting. I'm broadly drawn to mathematical foundations, algorithms, and the places where the two meet.
  </p>
</section>

<div class="facts reveal">
  <div class="fact"><div class="num" data-count="3" data-suffix="rd">3rd</div><div class="label">Part III, Cambridge</div></div>
  <div class="fact"><div class="num" data-count="5" data-suffix="+">5+</div><div class="label">Languages used</div></div>
  <div class="fact"><div class="num" data-count="100" data-suffix="%">100%</div><div class="label">Curiosity-driven</div></div>
</div>

<div class="section-head reveal">
  <h2>Recent projects</h2>
  <a class="link-more" href="{{ '/projects/' | relative_url }}">All projects →</a>
</div>

<div class="card-grid">
{% assign recent_projects = site.projects | sort: 'date' | reverse %}
{% for project in recent_projects limit: 2 %}
  <a class="card reveal" href="{{ project.url | relative_url }}">
    <div class="card-title">{{ project.title }} <span class="arrow">↗</span></div>
    <div class="card-meta">
      <span>{{ project.date | date: "%Y" }}</span>
      {% if project.tags %}{% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}{% endif %}
    </div>
    {% if project.description %}<div class="card-desc">{{ project.description }}</div>{% endif %}
  </a>
{% endfor %}
</div>

<div class="section-head reveal">
  <h2>Latest thoughts</h2>
  <a class="link-more" href="{{ '/thoughts/' | relative_url }}">All thoughts →</a>
</div>

<ul class="post-list reveal">
{% for post in site.posts limit: 3 %}
  <li>
    <span class="post-date">{{ post.date | date: "%Y %b %-d" }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
