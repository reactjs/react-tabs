import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import TabPanel from '../TabPanel';
import { TabsContext } from '../TabsContext';
import { TabPanelWrapper } from './helpers/higherOrder';

function expectToMatchSnapshot(component) {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

describe('<TabPanel />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error) => {
      throw new Error(error);
    };
  });

  test('should have sane defaults', () => {
    expectToMatchSnapshot(<TabPanel itemKey={0}>Hola</TabPanel>);
  });

  test('should render when selected', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={{ id: 'group', selectedKey: 0 }}>
        <TabPanel itemKey={0}>Hola</TabPanel>
      </TabsContext.Provider>,
    );
  });

  test('keeps forced contents mounted when the panel becomes hidden', () => {
    function panel(selectedKey) {
      return (
        <TabsContext.Provider value={{ id: 'group', selectedKey }}>
          <TabPanel itemKey={0} forceRender hidden={false}>
            <button type="button">Hola</button>
          </TabPanel>
        </TabsContext.Provider>
      );
    }

    const { rerender } = render(panel(0));
    const button = screen.getByRole('button', { name: 'Hola' });
    expect(button).toBeVisible();

    rerender(panel(1));

    expect(screen.getByRole('tabpanel', { hidden: true })).toHaveAttribute(
      'hidden',
    );
    expect(screen.getByText('Hola')).toBe(button);
    expect(button).not.toBeVisible();
  });

  test('should accept className', () => {
    expectToMatchSnapshot(<TabPanel itemKey={0} className="foobar" />);
  });

  test('should support being selected', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={{ id: 'group', selectedKey: 0 }}>
        <TabPanel itemKey={0}>Hola</TabPanel>
      </TabsContext.Provider>,
    );
  });

  test('should support being selected with custom class name', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={{ id: 'group', selectedKey: 0 }}>
        <TabPanel itemKey={0} selectedClassName="selected">
          Hola
        </TabPanel>
      </TabsContext.Provider>,
    );
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(
      <TabPanel itemKey={0} data-tooltip="Tooltip contents" />,
    );
  });

  test('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y-x/aria-role
    expectToMatchSnapshot(<TabPanel itemKey={0} role="micro-tab" />);
  });

  test('should allow for higher-order components', () => {
    expectToMatchSnapshot(<TabPanelWrapper itemKey={0} />);
  });
});
