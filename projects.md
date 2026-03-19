---
layout: default
title: Projects
permalink: /projects/
---

<h1>Projects</h1>

<div class="card">
  <h2>Multi-Agent Deep Reinforcement Learning for Drone Coordination</h2>
  <p>
    An end-to-end system for autonomous drone navigation and coordination in shared 3D airspace, spanning high-fidelity simulation to sophisticated multi-agent RL.
  </p>
  <h3>Key Features</h3>
  <ul>
    <li><strong>Simulation:</strong> Dynamic multi-agent 3D environment in Unity/C#, integrated with Python training via ML-Agents toolkit (PettingZoo API).</li>
    <li><strong>Core Algorithm:</strong> Continuous control agent based on Soft Actor-Critic (SAC), chosen for high-dimensional continuous action spaces.</li>
    <li><strong>Multi-Agent Strategy:</strong> Centralised Training with Decentralised Execution (CTDE) via a custom centralised critic network in PyTorch.</li>
    <li><strong>Perception:</strong> Knowledge Distillation pipeline distilling features from a pre-trained VIP model into the agent's lightweight CNN.</li>
    <li><strong>Exploration:</strong> Hybrid reward function (sparse terminal + dense progress-based) with an Intrinsic Curiosity Motivation (ICM) module.</li>
    <li><strong>Deployment:</strong> Trained policy exported to ONNX with an inference pipeline using <code>onnxruntime</code>.</li>
  </ul>
  <div style="margin-top: 12px;">
    <span class="tag tag--teal">SAC</span>
    <span class="tag tag--teal">CTDE</span>
    <span class="tag tag--teal">ICM</span>
    <span class="tag">Unity</span>
    <span class="tag">PyTorch</span>
    <span class="tag">ONNX</span>
    <span class="tag">W&amp;B</span>
  </div>
</div>

<div class="card">
  <h2>Cybersecurity AI: Knowledge Graphs &amp; Agentic Systems</h2>
  <p>
    Part of the VIGILANCE EU project — designing hybrid knowledge graph + vector database architectures for cybersecurity AI agents, integrating threat intelligence standards with modern retrieval and orchestration frameworks.
  </p>
  <ul>
    <li>Hybrid architecture combining Neo4j (graph) and Qdrant (vector) for structured and semantic cybersecurity knowledge.</li>
    <li>Metadata standards integration: STIX 2.1, TAXII, MITRE ATT&amp;CK, FAIR/DCAT.</li>
    <li>Embedding approaches: RotatE for knowledge graph embeddings, SecureBERT for domain-specific text.</li>
    <li>Agent orchestration evaluated across LangGraph, CrewAI, and AutoGen.</li>
  </ul>
  <div style="margin-top: 12px;">
    <span class="tag tag--teal">Neo4j</span>
    <span class="tag tag--teal">Qdrant</span>
    <span class="tag">LangGraph</span>
    <span class="tag">STIX 2.1</span>
    <span class="tag">MITRE ATT&amp;CK</span>
  </div>
</div>

<div class="card">
  <h2>NLP: Sexism Detection &amp; Biomedical Knowledge Graph Extraction</h2>
  <ul>
    <li><strong>Sexism Detection:</strong> BiLSTM + Twitter-RoBERTa ensemble and Mistral-7B prompting for detecting sexist content in social media text.</li>
    <li><strong>Biomedical KG Extraction:</strong> End-to-end system using GLiNER2 for NER, REBEL for relation extraction, BioBERT embeddings, and Kùzu graph database. Developed for a University of Bologna collaboration.</li>
  </ul>
  <div style="margin-top: 12px;">
    <span class="tag">Hugging Face</span>
    <span class="tag">BiLSTM</span>
    <span class="tag">RoBERTa</span>
    <span class="tag">Mistral-7B</span>
    <span class="tag">GLiNER2</span>
    <span class="tag">Kùzu</span>
  </div>
</div>

<div class="card">
  <h2>Extending Adversarial MARL in Rescue Missions</h2>
  <p>Extended the AdverSAR framework by creating a dynamic 3D environment in Unity and adapting the algorithm to function in a higher-dimensional space, where agents must extract objectives without being detected by adversarial agents.</p>
  <div style="margin-top: 12px;">
    <span class="tag">Unity</span>
    <span class="tag">MARL</span>
    <span class="tag">PyTorch</span>
  </div>
</div>

<div class="card">
  <h2>AutonomousProcgen</h2>
  <p>Developed a reinforcement learning agent for OpenAI Procgen Benchmark environments, using Proximal Policy Optimisation (PPO) integrated with Network Distillation for enhanced exploration.</p>
  <div style="margin-top: 12px;">
    <span class="tag">PPO</span>
    <span class="tag">Procgen</span>
    <span class="tag">Python</span>
  </div>
</div>

<div class="card">
  <h2>Norm Emergence in Multi-Agent Systems</h2>
  <p>Simulated complex road intersection scenarios in Unity/C#. Trained multi-agent systems with PPO and SAC to study norm emergence in dynamic environments.</p>
  <div style="margin-top: 12px;">
    <span class="tag">PPO</span>
    <span class="tag">SAC</span>
    <span class="tag">Unity</span>
    <span class="tag">C#</span>
  </div>
</div>

<div class="card">
  <h2>Adversarial Learning for Fairness in MARL</h2>
  <p>Python-based MARL framework deployed on AWS, implementing a Fair-DQN agent for mitigating bias in a simulated robotic warehouse environment using PyTorch.</p>
  <div style="margin-top: 12px;">
    <span class="tag">Fair-DQN</span>
    <span class="tag">AWS</span>
    <span class="tag">PyTorch</span>
  </div>
</div>

<div class="card">
  <h2>Multimodal NLP: Art-Critic</h2>
  <p>Vision-language system that analyses paintings to generate critic-style textual descriptions. Combined fine-tuned Hugging Face models for captioning with ResNet and ResNeXt for classification.</p>
  <div style="margin-top: 12px;">
    <span class="tag">Hugging Face</span>
    <span class="tag">ResNet</span>
    <span class="tag">Transfer Learning</span>
  </div>
</div>
