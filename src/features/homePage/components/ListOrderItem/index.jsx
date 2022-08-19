import React from 'react';
import PropTypes from 'prop-types';
import OderItem from '../OderItem';
import Table from 'react-bootstrap/Table';
import './ListOrderItem.scss';
import { TiArrowUnsorted } from 'react-icons/ti';

function ListOrderItem(props) {
    const { listItem, onClickUpdate, onClickDelete, onClickDisable, onClickIconSortDate } = props;

    return (
        <div>
            <Table className="table">
                <thead>
                    <tr>
                        {/* <th scope="col">Bill No</th>
                        {
                            isAdmin ? <th>User Id</th> : ""
                        } */}
                        <th scope="col">ID Bill</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Name Type</th>
                        <th scope="col">Money</th>
                        <th scope="col">Name Dish </th>
                        <th scope="col">Quantity</th>
                        <th scope="col">
                            Date order
                            <TiArrowUnsorted className='icon-sort' onClick={onClickIconSortDate} />
                        </th>
                        <th scope="col">Price</th>
                        {/* <th scope="col">Update</th>
                        {
                            isAdmin ? <th scope="col">Disable</th> : ""
                        }
                        <th scope="col">Delete</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        listItem && listItem.map(item => {
                            return <OderItem
                                item={item}
                                // isAdmin={isAdmin}
                                onClickDelete={onClickDelete}
                                onClickDisable={onClickDisable}
                                onClickUpdate={onClickUpdate}
                            />
                        })
                    }
                </tbody>
            </Table>
           
        </div>
    );
}

ListOrderItem.propTypes = {
    listItem: PropTypes.array,
    onClickUpdate: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickDisable: PropTypes.func,
    // isAdmin: PropTypes.bool,
    paging: PropTypes.object,
    onClickButtonFirst: PropTypes.func,
    onClickButtonLast: PropTypes.func,
    onClickButtonNext: PropTypes.func,
    onClickButtonPrev: PropTypes.func,
    onClickIconSortDate: PropTypes.func,
};

ListOrderItem.defaultProps = {
    listItem: [],
    onClickUpdate: null,
    onClickDelete: null,
    onClickDisable: null,
    // isAdmin: false,
    paging: {},
    onClickButtonFirst: null,
    onClickButtonLast: null,
    onClickButtonNext: null,
    onClickButtonPrev: null,
    onClickIconSortDate: null,
};

export default ListOrderItem;