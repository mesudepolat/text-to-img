import { useEffect, useRef } from "react";
import './App.css';

const Cursor = () => {
    const delay = 18;

    const dot = useRef(null);
    const dotOutline = useRef(null);

    const cursorVisible = useRef(true);
    const cursorEnglared = useRef(false);

    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mpusedown', mouseOverEvent);
        document.addEventListener('mouseup', mouseOutEvent);
        document.addEventListener('mousemove', mouseMoveEvent);
        document.addEventListener('mouseenter', mouseEnterEvent);
        document.addEventListener('mouseleave', mouseLeaveEvent);

        animatedDotOutline();
        return () => {
        document.removeEventListener('mpusedown', mouseOverEvent);
        document.removeEventListener('mouseup', mouseOutEvent);
        document.removeEventListener('mousemove', mouseMoveEvent);
        document.removeEventListener('mouseenter', mouseEnterEvent);
        document.removeEventListener('mouseleave', mouseLeaveEvent);

        cancelAnimationFrame(requestRef.current);
        }

    }, []);

    const toggleCursorVisibiilty = () => {
        if (cursorVisible.current){
            dot.current.style.opacity =1;
            dotOutline.current.style.opacity = 1;
        } else{
            dot.current.style.opacity = 0;
            dotOutline.current.style.opacity = 0;
        }
    };

    const toggleCursorSize = () => {
        if(cursorEnglared.current){
            dot.current.style.transform = 'translate(-50%, -50%) scale(0.75)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };
    
    const mouseOverEvent = () => {
        cursorEnglared.current = true;
        toggleCursorSize();
    };
    const mouseOutEvent = () => {
        cursorEnglared.current = false;
        toggleCursorSize();
    };
    const mouseEnterEvent = () => {
        cursorEnglared.current = true;
        toggleCursorVisibiilty();
    };
    const mouseLeaveEvent = () => {
        cursorVisible.current = false;
        toggleCursorVisibiilty();
    };
    const mouseMoveEvent = e => {
        cursorVisible.current = true;
        toggleCursorVisibiilty();

        endX.current = e.pageX;
        endY.current = e.pageY;

        dot.current.style.top = endY.current + 'px';
        dot.current.style.left = endX.current + 'px';
    };
    const animatedDotOutline = () => {
        _x.current += (endX.current - _x.current) / delay;
        _y.current += (endY.current - _y.current) / delay;

        dotOutline.current.style.top = _y.current + 'px';
        dotOutline.current.style.left = _x.current + 'px';

        requestRef.current = requestAnimationFrame(animatedDotOutline);
    };
    return(
        <>
            <div ref={dotOutline} className="cursor-dot-outline"></div>
            <div ref={dot} className="cursor-dot"></div>
        </>
    );
}

export default Cursor;