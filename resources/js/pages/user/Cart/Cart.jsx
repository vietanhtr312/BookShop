import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import CartStep from './Components/CartStep';
import Step1 from './Components/Steps/Step1';
import Step2 from './Components/Steps/Step2';
import Step3 from './Components/Steps/Step3';
import { OutInTransition } from '~/animations/Transition';
import ActionsBtns from './Components/ActionBtns';
import { useState, useCallback } from 'react';

const cx = classNames.bind(styles);

const Cart = () => {
    const [step, setStep] = useState(1);
    const [next, setNext] = useState(false);
    const [cartData, setCartData] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false);

    const handleSubmitCart = useCallback((c) => {
        setCartData(c);
        setStep(2);
    }, []);
    // console.log(carts);

    const handleSubmitPayment = useCallback((p) => {
        setPaymentInfo(p);
        setStep(3);
    }, []);
    // console.log(payment);

    return (
        <div className={cx('cart-page')}>
            <div className={cx('cart-left', 'grid wide')}>
                { !emptyCart && <CartStep step={step} />}
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
                            <Step3 cartData={cartData} paymentInfo={paymentInfo}/>
                        ) : (
                            <> </>
                        )}
                    </OutInTransition>
                </div>
                {!emptyCart && <ActionsBtns step={step} setStep={setStep} setNext={setNext} />}
            </div>
        </div>
    );
};

export default Cart;
