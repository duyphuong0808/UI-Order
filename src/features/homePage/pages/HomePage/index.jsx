import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.scss';
import TabsComponent from '../../components/TabsComponent';

HomePage.propTypes = {

};

function HomePage(props) {

    return (
        <div className='box-tabs-component'>
            <TabsComponent />
        </div>
    );
}

export default HomePage;