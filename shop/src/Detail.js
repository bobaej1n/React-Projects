import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components'
import './Detail.scss';

let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 }
`;

function Detail(props) {

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function(상품) {
    return 상품.id == id
  });
  let history = useHistory();

  let [알림, 알림변경] = useState(true);
  let [input, input변경] = useState('');

  useEffect(()=>{
    //axios.get(); // Detail 컴포넌트 로드 시 ajax로 데이터를 가져오고 싶을 때

    let 타이머 = setTimeout(()=>{ 알림변경(false) }, 2000);
    //return function 어쩌구(){  } // 컴포넌트가 사라질 때 코드 실행
    return ()=>{ clearTimeout(타이머) }
  }, []); // <- <Detail> 등장 시 한번 실행하고 끝남

  return (
    <div className="container">
      <박스>
        <제목 className='red'>상세페이지</제목>
      </박스>

      <input onChange={(e)=>{ input변경(e.target.value) }} />

      {
        알림 === true
        ? <Alert></Alert>
        : null
      }

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <Info 재고={props.재고}></Info>
          <button className="btn btn-danger" onClick={()=>{ props.재고변경([9,11,12]) }}>주문하기</button>
          &nbsp;
          <button className="btn btn-danger" onClick={ ()=>{ history.goBack() } }>뒤로가기</button>
        </div>
      </div>
    </div> 
  )
}

function Info(props) {
  return (
    <p>재고 : { props.재고[0] }</p>
  )
}

function Alert() {
  return (
    <div className="my-alert2">
    <p>재고가 얼마 남지 않았습니다</p>
  </div>
  )
}

export default Detail;