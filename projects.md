---
layout: default
title: Projects
permalink: /projects/
---

<h1>Projects</h1>

<h2>Multi-Agent Deep Reinforcement Learning for Drone Coordination</h2>

<p>
    This project addressed the complex challenge of autonomous drone navigation and coordination in a shared 3D airspace. Inspired by futuristic air traffic control concepts, I developed a comprehensive end-to-end system, spanning the creation of a high-fidelity physics-based simulation to the implementation and rigorous debugging of a sophisticated multi-agent reinforcement learning algorithm capable of continuous control.
</p>

<h3>Key Features & Technologies Implemented:</h3>
<ul>
    <li>
        <strong>Simulation Environment:</strong> Developed a dynamic, multi-agent 3D environment using <strong>Unity and C#</strong>. The simulation features complex physics, obstacle avoidance, and goal-oriented tasks, serving as a robust testbed for control algorithms. The environment was integrated with the Python training framework using the <strong>Unity ML-Agents toolkit (PettingZoo API)</strong>.
    </li>
    <li>
        <strong>Core Control Algorithm:</strong> Architected and implemented a continuous control agent based on <strong>Soft Actor-Critic (SAC)</strong>, a state-of-the-art off-policy algorithm. This choice was specifically made to handle the high-dimensional, continuous action space required for smooth drone flight.
    </li>
    <li>
        <strong>Multi-Agent Strategy:</strong> Solved the coordination problem using a <strong>Centralized Training with Decentralized Execution (CTDE)</strong> paradigm. This involved developing a custom centralised critic network in PyTorch that allows agents to share state information during training, leading to more effective and cooperative emergent behaviour.
    </li>
    <li>
        <strong>Advanced Perception:</strong> To handle first-person visual input from the drones, I implemented a <strong>Knowledge Distillation</strong> pipeline. This technique distilled learned features from a large, pre-trained vision model (VIP) into the agent's smaller, more efficient CNN, significantly improving the quality of its state representations.
    </li>
</ul>

<h3>Challenges & Solutions:</h3>
<p>
    A significant portion of this project involved overcoming common but critical challenges in reinforcement learning. The agent successfully navigated several difficult learning phases by implementing targeted solutions:
</p>
<ul>
    <li>
        <strong>Solving Sparse Rewards & Exploration:</strong> The initial sparse reward function led to the agent learning nothing. I engineered a hybrid reward function combining a large terminal reward with a dense, progress-based shaping reward. To escape local optima (e.g., passive or orbiting behaviour), I successfully integrated an <strong>Intrinsic Curiosity Motivation (ICM)</strong> module, which created an exploration bonus that encouraged the agent to discover the goal.
    </li>
    <li>
        <strong>Debugging the Agent-Environment Interface:</strong> A major hurdle was diagnosing why the agent would not move. This involved a systematic process of elimination, moving from the Python API to the Unity C# scripts. The root cause was identified in the drone's physics implementation (a mismatch between the applied velocity and the `Rigidbody`'s drag and settings), which was successfully resolved.
    </li>
    <li>
        <strong>Ensuring Training Stability:</strong> I systematically diagnosed and resolved multiple training instability issues, including policy collapse and reward hacking. This was achieved through iterative hyperparameter tuning (adjusting `gamma`, `tau`, learning rates), analysing metrics with <strong>Weights & Biases</strong>, and making precise adjustments to the environment's physics and reward signals.
    </li>
    <li>
        <strong>Model Deployment:</strong> The fully trained policy was successfully exported to the <strong>ONNX</strong> format, and an inference pipeline was created in Python using `onnxruntime` to run the model for evaluation and demonstration purposes.
    </li>
</ul>
<h2>Extending Adversarial MARL in Rescue Missions and Safe-Critic Environments</h2>
<p>Extended the AdverSAR framework by creating a dynamic 3D environment in Unity and adapting its algorithm to function effectively in a higher-dimensional space. The idea is to apply the AdverSAR Framework to a 3D environment where a group of agents needs to extract some objective without being detected by adversarial agents.</p>

<h2>AutonomousProcgen</h2>
<p>Developed a reinforcement learning agent to tackle OpenAI Procgen Benchmark environments. Used Proximal Policy Optimisation (PPO) integrated with exploration techniques like Network Distillation to enhance agent performance.</p>

<h2>Norm Emergence in Multi-Agent Systems Using Deep Reinforcement Learning</h2>
<p>Simulated complex road intersection scenarios in Unity using C#. Trained multi-agent systems with Proximal Policy Optimisation (PPO) and Soft Actor-Critic (SAC) algorithms to study norm emergence in dynamic environments.</p>

<h2>Adversarial Learning for Fairness in MARL</h2>
<p>Developed and deployed a Python-based multi-agent reinforcement learning (MARL) framework on AWS, utilising PyTorch, NumPy, and Matplotlib to implement a Fair-DQN agent for mitigating bias in a simulated robotic warehouse environment.</p>

<h2>Art-Critic</h2>
<p>Built a vision-language system that analyses paintings to generate critic-style textual descriptions. [cite: 29] [cite_start]The project combined fine-tuned Hugging Face models for caption generation with transfer learning approaches using ResNet and ResNeXt for classification and image captioning.</p>
