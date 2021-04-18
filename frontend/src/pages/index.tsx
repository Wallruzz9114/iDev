import Layout from '../components/shared/Layout';
import { withApollo } from '../utils/withApollo';

const Index: React.FC<{}> = () => <Layout></Layout>;

export default withApollo({ ssr: false })(Index);
