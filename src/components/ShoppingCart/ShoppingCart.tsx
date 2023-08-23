import React from "react";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  return (
    <div className="flex p-8 gap-12">
      {/* 장바구니 아이템 */}
      <div className="flex-initial w-2/3 mb-8">
        <div className="font-bold mb-8 text-lg">쇼핑백</div>
        <div className="flex justify-between mb-4 text-sm">
          <div>상품</div>
          <div>가격</div>
        </div>
        <hr />
        <ul>
          <CartItem
            name="파쏘 BL3"
            price="450000"
            amount="1"
            url="https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg"
          />
          <CartItem
            name="릿 PC5"
            price="370000"
            amount="5"
            url="https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/r/_/r.e.a.t_pc5_2.jpg"
          />
          <CartItem
            name="나다 WC3"
            price="300000"
            amount="2"
            url="https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_NADA_WC3_1.jpg"
          />
        </ul>
      </div>
      {/* 주문상세 */}
      <div className="flex-initial flex-col w-1/3 h-screen p-8 flex items-start">
        <div className="font-bold text-lg mb-16">주문상세</div>
        <div className="flex flex-col gap-1 py-4 border-y w-full">
          <div className="flex flex-row justify-between">
            <div>소계</div>
            <div>1,790,000원</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>배송비</div>
            <div>무료</div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between mt-4 mb-12">
          <div>합계</div>
          <div>1,790,000원</div>
        </div>
        <button className="w-full bg-black h-12 text-white font-bold mb-8">
          결제하기
        </button>
        <div className="w-full text-sm">
          무료 반품 서비스가 제공되오니 안심하고 구매하십시오.
        </div>
        <div className="w-full text-sm">
          배송에 대한 자세한 내용을 확인하십시오.
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
