import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderDetailApi from '../../../../api/orderDetailApi';
// import localStorageCustom from '../../../../app/localStorageCustom';
// import { LOCAL_STORAGE_CONST } from '../../../../constants/Constant';
import ListOrderItem from '../ListOrderItem';
import MenuTab from '../MenuTab';
import TabItemComponent from '../TabItemComponent';
import './TabsComponent.scss';
import { setOrder } from './tabsComponentSlice';
import logoutApi from '../../../../api/logout';
import { Link } from 'react-router-dom'


function TabsComponent(props) {

    const tabItems = [
        {
            id: 1,
            title: 'List order',
            content: 'step 1 content',
        },
        {
            id: 2,
            title: 'Menu',
        },
        
    ];

    const pagingDefault = {
        isFirst: true,
        isLast: true,
        pageNo: 0,
        totalPages: 1,
        sortDateDescending: true,
    };

    const [tabSelect, setTabSelect] = useState(1);
    const [isAdmin, /*setIsAdmin*/] = useState(false);
    const [isListOrder, setIsListOrder] = useState(false);
    const [items, setListItem] = useState([]);
    const [pageState, setPageState] = useState('loading');
    const [paging, setPaging] = useState(pagingDefault);

    const dispath = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        handleFetchOrderDetails();
    }, [isListOrder]);

    // const checkIsAdmin = () => {
    //     const isAdminLocal = localStorageCustom.getIsAdmin();

    //     if (isAdminLocal === LOCAL_STORAGE_CONST.TRUE) {
    //         setIsAdmin(true);
    //         return true;
    //     } else {
    //         setIsAdmin(false);
    //         return false;
    //     }
    // }

    const handleFetchOrderDetails = async () => {
        try {
            // if (checkIsAdmin()) {
            //     await getOrderSortByDate(paging.pageNo, paging.sortDateDescending);
            // } else {
                const response = await orderDetailApi.getOderDetailById();
                if (response.status === 200) {
                    setListItem(response.data);
                } else {
                    setListItem([]);
                }
            // }
            setPageState('success');
        } catch (error) {
            console.log("Error get order detail: ", error);
            setListItem([]);
            setPageState('failure');
        }
    }

    const handleOnClickItem = async (id) => {
        if (id === 1) {
            setIsListOrder(!isListOrder);
        }
        setTabSelect(id);
    };

    const handleOnDeleteItem = async (id) => {
        try {
            const response = await orderDetailApi.deleteOrder(id);
            if (response.status === 204) {
                setIsListOrder(!isListOrder);
            } else {
                console.log("Error: ", response.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleOnUpdateItem = (item) => {
        const action = setOrder(item);
        dispath(action);
        navigate('/update');
    }

    const handleOnClickIconSortDate = async () => {
        console.log("Click icon sort date");
        await getOrderSortByDate(0, !paging.sortDateDescending);
    }

    const handleOnClickButtonFirst = async () => {
        await getOrderSortByDate(0, paging.sortDateDescending);
    }

    const handleOnClickButtonLast = async () => {
        await getOrderSortByDate(paging.totalPages - 1, paging.sortDateDescending);
    }

    const handleOnClickButtonNext = async () => {
        await getOrderSortByDate(paging.pageNo + 1, paging.sortDateDescending);
    }

    const handleOnClickButtonPrev = async () => {
        await getOrderSortByDate(paging.pageNo - 1, paging.sortDateDescending);
    }

    const getOrderSortByDate = async (pageNo, descending) => {
        try {
            const response = await orderDetailApi.getOrderSortByDate(pageNo, descending);
            if (response.status === 200) {
                setPaging({
                    isFirst: response.data.first,
                    isLast: response.data.last,
                    pageNo: response.data.number,
                    totalPages: response.data.totalPages,
                    sortDateDescending: descending,
                });
                setListItem(response.data.content);
            }
        } catch (error) {
            console.log("Call api get order sort by date: ", error);
        }
    }

    if (pageState === 'loading') return <p>Loading .... </p>
    if (pageState === 'failure') return <p>Failure .... </p>
    return (
        
        <div className="wrapper">
            <ul className='nav nav-tabs'>
                {tabItems.map(({ id, title }) =>
                    <li className='nav-item' key={id}>
                        <TabItemComponent
                            title={title}
                            onItemClicked={() => handleOnClickItem(id)}
                            isActive={tabSelect === id}
                        />
                    </li>)
                }
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
                        { <li><Link className="nav-link" to="/login" onClick={logoutApi.logout}>Logout</Link>
                            
                        </li>}
                    </ul>
            <div className="content">
                {
                    tabSelect === 1 ?
                        <ListOrderItem
                            listItem={items}
                            isAdmin={isAdmin}
                            onClickDelete={handleOnDeleteItem}
                            onClickUpdate={handleOnUpdateItem}
                            paging={paging}
                            onClickButtonFirst={handleOnClickButtonFirst}
                            onClickButtonLast={handleOnClickButtonLast}
                            onClickButtonNext={handleOnClickButtonNext}
                            onClickButtonPrev={handleOnClickButtonPrev}
                            onClickIconSortDate={handleOnClickIconSortDate}
                        /> :
                        <MenuTab />
                }

            </div>
            
        </div>
    )
}

TabsComponent.propTypes = {
};

TabsComponent.defaultProps = {
};

export default TabsComponent;