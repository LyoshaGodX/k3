# Style And Conventions
- HTML uses semantic section blocks and Russian copy. Section classes are descriptive block names such as `hero`, `method`, `services`, `specializations`, `deliverables`, `team`, and `contact`.
- CSS is centralized in `styles.css`, uses root color/layout variables, card grids, breakpoint blocks at 1120px and 760px, and restrained geometric decoration.
- Typography uses local Unbounded; long Russian headings need deliberate wrapping on narrow screens.
- Interaction patterns are CSS hover states, `reveal` scroll classes, and pointer lenses in method/result sections driven by vanilla JS.
- Keep edits scoped to existing classes and reuse established hover/accent behavior instead of introducing a new component system.