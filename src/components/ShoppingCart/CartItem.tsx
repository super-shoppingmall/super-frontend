import React from "react";

type CartItemProps = {
  name: string;
  price: string;
  amount: string;
  url: string;
};

const CartItem = ({ name, price, amount, url }: CartItemProps) => {
  const priceWithComma = Number(price).toLocaleString();
  const subAmount = (Number(price) * Number(amount)).toLocaleString();

  return (
    <li>
      <div className="flex gap-8 py-6">
        {/* 이미지 wrapper */}
        <div className="flex-initial w-3/12">
          <img src={url} alt={name + "사진"} />
        </div>

        <div className="flex-initial justify-between flex w-9/12">
          {/* 제품명, 단가, 수량: 왼쪽 */}
          <div className="flex flex-col justify-between">
            {/* 제품명, 단가 */}
            <div>
              <div className="text-base font-bold">{name}</div>
              <div className="text-base">{priceWithComma}원</div>
            </div>
            {/* 수량 controller */}
            <div className="flex gap-4 border border-solid border-black justify-center py-1 px-4 text-xs">
              <button>-</button>
              <div>{amount}</div>
              <button>+</button>
            </div>
          </div>
          {/* 소계, 삭제: 오른쪽 */}
          <div className="flex flex-col justify-between">
            {/* 소계 */}
            <div>{subAmount}원</div>
            {/* 삭제 버튼 */}
            <div className="flex justify-end">
              <button className="w-fit	border-b border-black">삭제</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </li>
  );
};

export default CartItem;
