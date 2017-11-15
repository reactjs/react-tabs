import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../src/index';
import '../../style/react-tabs.css';

const App = () => {
  return (
    <div>
      <p><em>Hint:</em></p>
      <ul>
        <li>use keyboard tab to focus tabs</li>
        <li>use arrow keys to navigate focused tabs</li>
      </ul>

      <Tabs forceRenderTabPanel={true}>
        <TabList>
          <Tab>React</Tab>
          <Tab>Ember</Tab>
          <Tab>Angular</Tab>

          <span>+</span>
        </TabList>

        <TabPanel>
          <h2>Just The UI</h2>
          <p>Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.</p>

          <h2>Virtual DOM</h2>
          <p>React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required.</p>

          <h2>Data Flow</h2>
          <p>React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.</p>

          <p>Source: <a href="http://facebook.github.io/react/" target="_blank">React</a></p>
        </TabPanel>
        <TabPanel>
          <h2>Handlebars</h2>
          <p>Write dramatically less code with Ember's Handlebars integrated templates that update automatically when the underlying data changes.</p>

          <h2>Architecture</h2>
          <p>Don't waste time making trivial choices. Ember.js incorporates common idioms so you can focus on what makes your app special, not reinventing the wheel.</p>

          <h2>Productivity</h2>
          <p>Ember.js is built for productivity. Designed with developer ergonomics in mind, its friendly APIs help you get your job done—fast.</p>

          <p>Source: <a href="http://emberjs.com/" target="_blank">Ember</a></p>
        </TabPanel>
        <TabPanel>
          <h2>Why AngularJS?</h2>
          <p>HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.</p>

          <h2>Alternatives</h2>
          <p>Other frameworks deal with HTML’s shortcomings by either abstracting away HTML, CSS, and/or JavaScript or by providing an imperative way for manipulating the DOM. Neither of these address the root problem that HTML was not designed for dynamic views.</p>

          <h2>Extensibility</h2>
          <p>AngularJS is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs. Read on to find out how.</p>

          <p>Source: <a href="https://angularjs.org/" target="_blank">Angular</a></p>
        </TabPanel>
      </Tabs>

      <Tabs>
        <TabList>
          <Tab>Mario</Tab>
          <Tab disabled>Luigi</Tab>
          <Tab>Peach</Tab>
          <Tab>Yoshi</Tab>
        </TabList>

        <TabPanel>
          <p>Mario (Japanese: マリオ Hepburn: Mario?) is a fictional character in the Mario video game franchise by Nintendo, created by Japanese video game designer Shigeru Miyamoto. Serving as Nintendo's mascot and the eponymous protagonist of the series, he has a younger brother Luigi. Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, he repeatedly rescues Princess Peach from the Koopa villain Bowser and stops his numerous plans to destroy him and take over the kingdom.</p>
          <p>Source: <a href="http://en.wikipedia.org/wiki/Mario" target="_blank">Wikipedia</a></p>
        </TabPanel>
        <TabPanel>
          <p>Luigi (Japanese: ルイージ Hepburn: Ruīji?) is a fictional character featured in video games and related media released by Nintendo. Created by prominent game designer Shigeru Miyamoto, Luigi is portrayed as the slightly younger but taller fraternal twin brother of Nintendo's mascot Mario, and appears in many games throughout the Mario franchise, frequently as a sidekick to his brother.</p>
          <p>Source: <a href="http://en.wikipedia.org/wiki/Luigi" target="_blank">Wikipedia</a></p>
        </TabPanel>
        <TabPanel>
          <p>Princess Peach (Japanese: ピーチ姫 Hepburn: Pīchi-hime?) is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto, Peach is the princess of the fictional Mushroom Kingdom, which is constantly under attack by Bowser. She often plays the damsel in distress role within the series and is the lead female.[1] She is often portrayed as Mario's love interest and has appeared in nearly all the Mario games to date with the notable exception of Super Princess Peach, where she is the main playable character.</p>
        </TabPanel>
        <TabPanel>
          <p>Yoshi (ヨッシー Yosshī?) /ˈjoʊʃi/ or /ˈjɒʃi/, once romanized as Yossy, is a fictional anthropomorphic dinosaur (referred to as a dragon at times) who appears in video games published by Nintendo. He debuted in Super Mario World (1990) on the Super Nintendo Entertainment System as Mario and Luigi's sidekick (a role he has often reprised), and he later established his own series with several platform and puzzle games, including Super Mario World 2: Yoshi's Island. He has also appeared in many of the spin-off Mario games including the Mario Party, the Mario Kart, and the Super Smash Bros. series, as well as in other various Mario sports titles. Yoshi also appears in New Super Mario Bros. Wii (2009) as the characters' companion and steed, similar to his original debut role in Super Mario World. Yoshi belongs to the species of the same name which comes in various colors, with green being the most common.</p>
          <p>Source: <a href="http://en.wikipedia.org/wiki/Yoshi" target="_blank">Wikipedia</a></p>
        </TabPanel>
      </Tabs>

      <Tabs>
        <TabList>
          <small style={{ padding: '0 10px' }}>Tabs:</small>
          <Tab>Tab A</Tab>
          <Tab>Tab B</Tab>
          <code style={{ padding: '0 10px' }}>(separator)</code>
          <Tab>Tab C</Tab>
          <span style={{ padding: '0 10px' }}><small>End of tabs</small></span>
        </TabList>

        <TabPanel>
          <h2>This is Tab A</h2>
          <p>You can put arbitrary elements inside <code>{'<TabList>'}</code>.</p>
        </TabPanel>
        <TabPanel>
          <h2>This is Tab B</h2>
          <p>Navigating through the tabs with the keyboard will skip these arbitrary elements.</p>
        </TabPanel>
        <TabPanel>
          <h2>This is Tab C</h2>
          <p>Just mind that the output might be invalid HTML (<code>{'<div>'}</code> inside a <code>{'<ul>'}</code> for instance).</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

render(<App />, document.getElementById('example'));
