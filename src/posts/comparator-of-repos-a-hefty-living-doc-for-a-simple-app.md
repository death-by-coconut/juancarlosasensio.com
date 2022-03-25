---
date: 2021-10-01
title: 'Comparator-of-Repos: a hefty living doc for a simple app'
tags:
- learn-in-public
- project
image: ''

---
I knew very little React when I first started with this project. It started out as a pen on Codepen built with React class Components at a time when I still wasn't too sure about the rendering process and lifecycle of stateful components. Since then, I've learned a ton. This living document aims to describe my learning journey, from novice to intermediate React development.

Class components where a natural starting point. Coming from Ruby's built-in OOP affordances and features, it made a lot of sense to build classes that bundle related data and functionality, compose applications using these classes and spin up new, independent instances of those classes when running the app. Although JavaScript's implementation of OOP is quite different from Ruby (and one could say _more limited)_, React provided enough abstraction for me to not worry too much about those details and get to work.

React Components are reusable units of code. They aim to do one thing and do it well, following the single responsibility principle. A React app is composed of these units. I quickly stumbled upon my first hurdle: understanding state, props and where each should live. Lifting state up was a useful lesson to learn and it paved the way for reaping the benefits of one-way data binding and separating code into components down the line.

Side-note: along the why, I started to notice a pattern of differences between working in Rails (a web-app dev framework in Ruby) vs React (a JavaScript frontend library). Rails is opinionated about code organization. React is not and there are pros and cons to this approach. For me, declarative code (React) is easier to reason with, although it takes more time to write and understand at the beginning. Imperative code (Rails) provides great time savings when starting out but becomes cumbersome down the line, when the "boilerplate" code needs to be understood before being modified to meet more specific needs, needing to reveal "hidden" parts of the codebase along the way.

Another: immutability and the lifecycle and rendering steps of a React component.

Since this application makes a call to GitHub's Repository API upon every form submission, there was a discrepancy in the value of certain pieces of state.

Things I still need to improve upon include: async operations, error handling and providing visual feedback during loading/fetching.

I then decided to move the project away from Codepen and into its own repository. This feels like a natural path moving forward: start with Codepen for speed and focus. Somewhere along the way, the need for revision history starts to matter more than speed and so switching over to git becomes valuable.

This app is simple. However, I still needed to do some prop-drilling beyond the point where it feels reasonable. I could've used React's context API, but instead I decided to use this opportunity to learn Redux. I started learning Redux, and I noticed that it was a tiny bit more difficult to reason about when using class components vs. functional ones. So I decided to, first, convert all React components to be functional components...