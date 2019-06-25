import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import NoticeTable from './NoticeTable';
import Dimmed from '../Dimmed';
import Progress from '../Progress';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../modules/admin';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import NoticeForm from './NoticeForm';


const Wrapper = styled.div`
    width : 60%;
    margin : 0 auto;
    display : flex;
    flex-direction : column;
`
const Title = styled.div`
    font-size : 1.5;
    font-weight : 600;
    padding : 1rem;
`
const PageBox = styled.div`
    width : 40%;
    align-self : center;
    display : flex;
    align-items: center;
    justify-content : space-around;

    .text:hover {
        cursor : default;
    }
`

const LeftIcon = styled.div`
    color : #333333;
    &:hover {
        color : #555555;
    }
    &:active { 
        color : #111111;
    }

    ${props => 
        props.disabled 
        && css`
            color : #eeeeee;
            &:hover {
                color : #eeeeee;
            }
        `
    };
`
const RightIcon = styled.div`
    color : #333333;
    &:hover {
        color : #555555;
    }
    &:active { 
        color : #111111;
    }

    ${props => 
        props.disabled 
        && css`
            color : #eeeeee;
            &:hover {
                color : #eeeeee;
            }
        `
    };
`

const WriteButton = styled.div`
    position : relative;
    align-self : flex-end;
    top: -30px;

`
class NoticeListView extends Component {

    componentDidMount() {
        const {AdminActions} = this.props;
        const {pageNum} = this.props.match.params;
        AdminActions
            .getMaxPageAction()
            .then(() => {
                AdminActions.getNoticeAction(pageNum);
            })
    }
    

    handlePrevPage = () => {
        const {AdminActions} = this.props;
        const pageNum = parseInt(this.props.match.params.pageNum);
        if(pageNum === 1)   return;

        this.props.history.push(`/admin/notice/${pageNum-1}`);
        AdminActions.getNoticeAction(pageNum-1);
    }
    handleNextPage = () => {
        const {AdminActions} = this.props;
        const {maxPage} = this.props.AdminState.getMaxPage;
        const pageNum = parseInt(this.props.match.params.pageNum);
        if(pageNum === maxPage)   return;

        this.props.history.push(`/admin/notice/${pageNum+1}`);
        AdminActions.getNoticeAction(pageNum+1);
    }

    handleShowForm = () => {
        const {AdminActions} = this.props;
        AdminActions.openNoticeForm();
    }
    
    render() {
        const pageNum = parseInt(this.props.match.params.pageNum);
        const {AdminActions, AdminState} = this.props;

        const{
            fetching : pageFetching,
            result : pageResult,
            maxPage
        } = AdminState.getMaxPage;

        const{
            fetching : noticeFetching,
            result : noticeResult,
            notice
        } = AdminState.getNotice;

        if(pageFetching)    return <Progress/>
        if(pageFetching || pageResult !== 'SUCCESS')  return null;
        
        return (
            <Wrapper>
                <Title>공지사항</Title>
                {
                    noticeFetching
                    ? (
                        <Progress/>
                    ):
                    noticeResult === 'SUCCESS'
                    ? (
                        <NoticeTable
                            data={notice}/>
                    ):
                    noticeResult === 'FAILURE'
                    ? (
                        "데이터 없음"
                    ): (
                        "에러"
                    )
                }
                <PageBox>
                    <LeftIcon disabled={pageNum === 1} onClick={this.handlePrevPage}>
                        <FaChevronLeft/>
                    </LeftIcon>
                    <span className="text">페이지 이동</span>
                    <RightIcon disabled={pageNum === maxPage} onClick={this.handleNextPage}>
                        <FaChevronRight/>
                    </RightIcon>
                </PageBox>
                <WriteButton>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleShowForm}>글 작성</Button>
                </WriteButton>

                <NoticeForm
                    visible={AdminState.noticeForm.visible}
                    pageNum={pageNum}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AdminState : state.admin.toJS()
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions, dispatch)
    })
)(NoticeListView);