# rullo16.github.io

Personal website of **Federico Rullo**, ML Engineer (RAG and agent systems, MLOps, multi-agent RL, game development).
Built with Jekyll and deployed to GitHub Pages by the workflow in `.github/workflows/jekyll-gh-pages.yml`.

Live at <https://rullo16.github.io>.

## Updating content

Almost everything you'd want to change lives in `_data/` as plain YAML. Text fields accept Markdown
(`**bold**`, `[links](/projects/)`), and there's no HTML to touch.

| File | What it drives |
| --- | --- |
| `_data/experience.yml` | Jobs on the Experience page (newest first) |
| `_data/projects.yml` | Project cards and filter categories. `featured: true` also shows a project on the home page |
| `_data/drone_results.yml` | The MAPPO results chart and table |
| `_data/education.yml` | Degrees and dissertations |
| `_data/skills.yml` | Skill groups (each with an icon name from `_includes/icon.html`) and spoken languages |
| `_data/games.yml` | Unreal Engine game cards |
| `_data/social.yml`, `_data/navigation.yml` | Contact links and the top menu |

The home page (`index.html`) holds the hero text and the "What I'm working on" cards.
The years of experience are computed at build time from `career_start` in `_config.yml`,
so they stay current on every deploy.

## Structure

```
_config.yml          site settings, SEO, career start date
_data/               content (see above)
_includes/           header, footer, icons, project card, results chart
_layouts/            default (shell) and page (inner pages with a title block)
assets/css/main.css  all styles, light and dark themes
assets/js/main.js    theme toggle, mobile menu, project filters, chart reveal, click-to-play game
assets/js/swarm.js   the multi-agent swarm animation in the home page hero
assets/img/          favicon, touch icon and social preview card (og-card.png)
```

No theme gem, no build step beyond Jekyll, and no JavaScript dependencies.

## Local development

Requires Ruby 3.x and Bundler.

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then visit <http://localhost:4000>. The `Gemfile` pins `github-pages`, so the local build uses the
same Jekyll version and plugins as the deployed site.

Pull requests against `master` are built by the same workflow, so a broken build is caught
before it deploys.
