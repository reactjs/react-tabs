import hoist from 'hoist-non-react-statics';
import TabList from '../../../TabList';

function TabListWrapper(props) {
  return <TabList {...props} />;
}

export default hoist(TabListWrapper, TabList);
