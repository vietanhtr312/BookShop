import { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './AdminProductCreate.module.scss';
import Content from '~/components/Content';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import { OutInTransition } from '~/animations/Transition';
import StepHeader from './Parts/StepHeader';
import ActionsBtns from './Parts/ActionsBtns';
import useProduct from '~/hooks/useProduct';
import useVariants from '~/hooks/useVariants';
import { createProduct } from '~/services/productService';
import { createVariant } from '~/services/variantService';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        // link: config.routes.admin.dashboard,
    },
    {
        title: 'Sản phẩm - Thêm mới',
        // link: config.routes.admin.productCreate,
    },
];

const AdminProductCreate = () => {
    const [step, setStep] = useState(1);
    const [next, setNext] = useState(false);
    const { product, setProduct, resetProduct } = useProduct({});
    const { variants, setVariants, resetVariants } = useVariants([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log(product);

    useEffect(() => {
        const handleCreate = async () => {
            setLoading(true);

            const productResponse = await createProduct(product);
            setMessages((prev) => [...prev, productResponse.message]);
            const productId = productResponse.product.id;

            await Promise.all(
                variants.map(async (variant) => {
                    const variantResponse = await createVariant(variant, productId);
                    setMessages((prev) => [...prev, variantResponse.message]);
                }),
            );

            setLoading(false);
        };

        if (step === 3) handleCreate();
    }, [step]);

    const handleSubmitProduct = useCallback((p) => {
        setProduct(p);
        setStep(2);
    }, []);

    const handleSubmitVariants = useCallback((v) => {
        setVariants(v);
        setStep(3);
    }, []);

    const continueCreateProduct = useCallback(() => {
        resetProduct();
        resetVariants();
        setMessages([]);
        setStep(1);
    }, []);

    return (
        <Content breadcrumb={BREADCRUMB}>
            <form className={cx('admin-product-create')}>
                <StepHeader step={step} setStep={setStep} />

                <div className={cx('step-content')}>
                    <OutInTransition state={step}>
                        {step === 1 ? (
                            <StepOne
                                initialProduct={product}
                                onSubmit={handleSubmitProduct}
                                next={next}
                                setNext={setNext}
                            />
                        ) : step === 2 ? (
                            <StepTwo
                                initialVariants={variants}
                                onSubmit={handleSubmitVariants}
                                next={next}
                                setNext={setNext}
                            />
                        ) : (
                            <StepThree messages={messages} loading={loading} />
                        )}
                    </OutInTransition>
                </div>

                <ActionsBtns
                    step={step}
                    loading={loading}
                    setStep={setStep}
                    setNext={setNext}
                    continueCreateProduct={continueCreateProduct}
                />
            </form>
        </Content>
    );
};

export default AdminProductCreate;
