---
layout: default
title: Games
permalink: /games/
---

<h1>Games</h1>

<div class="card">
  <h2>2D HD2D Dungeon Adventure — Unreal Engine 5 <span class="tag tag--teal">In Development</span></h2>
  <p>
    A 2D HD2D-style dungeon adventure game built from scratch in Unreal Engine 5 using C++ and the PaperZD plugin for 2D animation. This is a personal creative project where I'm designing and implementing every system hands-on.
  </p>

  <h3>Implemented Systems</h3>
  <ul>
    <li><strong>Dialogue System:</strong> A full dialogue framework with DataTable integration for content management and a typewriter text reveal effect. NPCs support branching conversations triggered through interaction.</li>
    <li><strong>NPC AI:</strong> Autonomous roaming behaviours with patrol and idle states, plus player-proximity interaction triggers. AI logic drives both ambient world behaviour and quest-related encounters.</li>
    <li><strong>Combat Mechanics:</strong> Hit detection via animation notifies (PaperZD), knockback physics, invincibility frames on damage, and a health component shared across players and enemies.</li>
    <li><strong>HUD &amp; UI:</strong> Health bars, interaction prompts, and dialogue boxes implemented as UMG widgets with Blueprint-C++ integration for clean separation of logic and presentation.</li>
  </ul>

  <h3>Technical Stack</h3>
  <div style="margin-top: 8px;">
    <span class="tag">Unreal Engine 5</span>
    <span class="tag">C++</span>
    <span class="tag">PaperZD</span>
    <span class="tag">Blueprints</span>
    <span class="tag">UMG Widgets</span>
    <span class="tag">DataTables</span>
  </div>
</div>

<hr>

<h2>Top-Down Shooter — Unity WebGL</h2>
<p>A browser-playable top-down shooter built in Unity. Give it a go below!</p>

<div class="game-embed">
  <iframe
    src="https://rullo16.github.io/TopDown/"
    width="960"
    height="600"
    style="border:none; transform:scale(0.6667); transform-origin:top left;"
    allowfullscreen>
  </iframe>
</div>

<p><strong>Controls:</strong></p>
<ul>
  <li><strong>WASD</strong> or arrow keys to move.</li>
  <li><strong>Mouse</strong> to aim, <strong>left-click</strong> to shoot.</li>
</ul>
---
layout: default
title: Games
permalink: /games/
---

<h1>Games</h1>


<div style="
    width:640px;
    height:400px;
    overflow:hidden;
    border-radius:8px;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
    margin:40px auto;
">
  <iframe 
      src="https://rullo16.github.io/TopDown/" 
      width="960" 
      height="600" 
      style="
          border:none;
          transform:scale(0.6667); /* 640/960 = 0.6667 scale factor */
          transform-origin:top left;
      " 
      allowfullscreen>
  </iframe>
</div>



<p><strong>Controls and gameplay instructions:</strong></p>
<ul>
  <li>Use WASD or arrow keys to move.</li>
  <li>Aim using the mouse and left-click to shoot.</li>
  <li>Enjoy and have fun!</li>
</ul>

