import ExampleItem from '../ExampleItem';

const code = `const Component = (
  <Tabs forceRenderTabPanel defaultKey={1}>
    <TabList>
      <Tab itemKey={0}>The Simpsons</Tab>
      <Tab itemKey={1}>Futurama</Tab>
    </TabList>
    <TabPanel itemKey={0}>
      <Tabs defaultKey={0} forceRenderTabPanel>
        <TabList>
          <Tab itemKey={0}>Homer Simpson</Tab>
          <Tab itemKey={1}>Marge Simpson</Tab>
          <Tab itemKey={2}>Bart Simpson</Tab>
          <Tab itemKey={3}>Lisa Simpson</Tab>
          <Tab itemKey={4}>Maggie Simpson</Tab>
        </TabList>
        <TabPanel itemKey={0}>
          <p>Husband of Marge; father of Bart, Lisa, and Maggie.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png" alt="Homer Simpson" />
        </TabPanel>
        <TabPanel itemKey={1}>
          <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png" alt="Marge Simpson" />
        </TabPanel>
        <TabPanel itemKey={2}>
          <p>Oldest child and only son of Homer and Marge; brother of Lisa and Maggie.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png" alt="Bart Simpson" />
        </TabPanel>
        <TabPanel itemKey={3}>
          <p>Middle child and eldest daughter of Homer and Marge; sister of Bart and Maggie.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png" alt="Lisa Simpson" />
        </TabPanel>
        <TabPanel itemKey={4}>
          <p>Youngest child and daughter of Homer and Marge; sister of Bart and Lisa.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png" alt="Maggie Simpson" />
        </TabPanel>
      </Tabs>
    </TabPanel>
    <TabPanel itemKey={1}>
      <Tabs defaultKey={0} forceRenderTabPanel>
        <TabList>
          <Tab itemKey={0}>Philip J. Fry</Tab>
          <Tab itemKey={1}>Turanga Leela</Tab>
          <Tab itemKey={2}>Bender Bending Rodriguez</Tab>
          <Tab itemKey={3}>Amy Wong</Tab>
          <Tab itemKey={4}>Professor Hubert J. Farnsworth</Tab>
          <Tab itemKey={5}>Doctor John Zoidberg</Tab>
        </TabList>
        <TabPanel itemKey={0}>
          <p>Protagonist, from the 20th Century. Delivery boy. Many times great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png" alt="Philip J. Fry" />
        </TabPanel>
        <TabPanel itemKey={1}>
          <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
        </TabPanel>
        <TabPanel itemKey={2}>
          <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is Fry's best friend. Built in Tijuana, Mexico, he is the Planet Express Ship's cook.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png" alt="Bender Bending Rodriguez" />
        </TabPanel>
        <TabPanel itemKey={3}>
          <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.</p>
        </TabPanel>
        <TabPanel itemKey={4}>
          <p>Many times great-nephew of Fry. CEO and owner of Planet Express delivery company. Tenured professor of Mars University.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png" alt="Professor Hubert J. Farnsworth" />
        </TabPanel>
        <TabPanel itemKey={5}>
          <p>Alien from Decapod 10. Planet Express' staff doctor and steward. Has a medical degree and Ph.D in art history.</p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png" alt="Doctor John Zoidberg" />
        </TabPanel>
      </Tabs>
    </TabPanel>
  </Tabs>
);

render(Component);`;

const hint = 'Tabs can also be nested within each other and will continue to work individually.';

export default () => <ExampleItem code={code} hint={hint} label="Matt Groening Example" />;
