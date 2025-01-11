import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import PropTypes, { number, string } from 'prop-types';

import './Transition.scss';

const OutInTransition = ({ children, state, inOut = false }) => {
    const nodeRef = useRef(null);

    return (
        <div className="out-in-transition">
            <SwitchTransition mode={inOut ? 'in-out' : 'out-in'}>
                <CSSTransition
                    key={state}
                    nodeRef={nodeRef}
                    addEndListener={(done) => {
                        nodeRef.current.addEventListener('transitionend', done, false);
                    }}
                    classNames="fade"
                >
                    <div ref={nodeRef} className="transition-children">
                        {children}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

OutInTransition.propTypes = {
    children: PropTypes.node.isRequired,
    state: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    inOut: PropTypes.bool,
};

export default OutInTransition;
