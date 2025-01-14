import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import CartStep from './Components/CartStep';
import Step1 from './Components/Steps/Step1';
import Step2 from './Components/Steps/Step2';
import Step3 from './Components/Steps/Step3';
import Step4 from './Components/Steps/Step4';
import { OutInTransition } from '~/animations/Transition';
import ActionsBtns from './Components/ActionBtns';
import { useState, useCallback, useEffect } from 'react';
import { createOrder } from '~/services/orderService';
import { useCart } from '~/hooks/useCart';

const cx = classNames.bind(styles);

const Cart = () => {
    const [step, setStep] = useState(1);
    const [next, setNext] = useState(false);
    const [cartData, setCartData] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false);
    const [messages, setMessages] = useState([]);
    const userId = localStorage.getItem('userId');
    const { fetchCarts } = useCart();

    const handleCreate = async () => {
        setLoading(true);

        const order = {
            user_id: userId,
            payment_method: paymentInfo.payment,
            shipping_address: paymentInfo.deliveryAddress,
            shipping_phone: paymentInfo.phone,
            total_price: cartData.total,
            total_quantity: cartData.count,
            cart_ids: cartData.carts.map((cart) => cart.id),
        }

        // console.log(order);

        const response = await createOrder(order);
        setMessages((prev) => [...prev, response.message]);
        await fetchCarts();
        setLoading(false);
    };

    useEffect(() => {
        if (step === 4) handleCreate();
    }, [step]);

    const handleSubmitCart = useCallback((c) => {
        setCartData(c);
        setStep(2);
    }, []);
    
    const handleSubmitPayment = useCallback((p) => {
        setPaymentInfo(p);
        setStep(3);
    }, []);
    // console.log(cartData);
    // console.log(paymentInfo);

    return (
        <div className={cx('cart-page')}>
            <div className={cx('cart-left', 'grid wide')}>
                {!emptyCart && <CartStep step={step} />}
                <div className={cx('cart-content')}>
                    <OutInTransition state={step}>
                        {step === 1 ? (
                            <Step1
                                onSubmit={handleSubmitCart}
                                next={next}
                                setNext={setNext}
                                setEmptyCart={setEmptyCart}
                            />
                        ) : step === 2 ? (
                            <Step2
                                onSubmit={handleSubmitPayment}
                                next={next}
                                setNext={setNext}
                            />
                        ) : step === 3 ? (
                            <Step3 cartData={cartData} paymentInfo={paymentInfo} />
                        ) : step === 4 && (
                            <Step4 loading={loading} messages={messages} />
                        )}
                    </OutInTransition>
                </div>
                {!emptyCart && <ActionsBtns loading={loading} step={step} setStep={setStep} setNext={setNext} />}
            </div>
        </div>
    );
};

export default Cart;
