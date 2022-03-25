/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useContext } from "react";
import { ICommonProps, kwtClassNames } from "utils";
import { AccordionContext } from "./AccordionComponent";

type T = HTMLDivElement;

interface IAccordionItemProps extends ICommonProps
{
    title: string;

    children: any;

    onClick? (open: boolean, target: T, event: React.MouseEvent<T>): void;
}

/**
 * React AccordionItem component for creating accordion items
 * (can be created only inside Accordion component).
 */
export default memo(forwardRef((props: IAccordionItemProps, ref: React.ForwardedRef<T>) => {
    const { openItems, setOpenItems } = useContext(AccordionContext);

    if (!setOpenItems) {
        console.warn("It make no sense to use accordion item outside of accordion component.");
        return null;
    }

    const { className, disabled } = props;

    const onComponentClick = useCallback((event: React.MouseEvent<T>) => setOpenItems(openItems => {
        const target = event.target as T;
        let nextState = [ ...openItems ];

        if (nextState.includes(props.title)) nextState = nextState.filter(item => item != props.title);
        else nextState.push(props.title);

        props.onClick && props.onClick(nextState.includes(props.title), target, event);
        return nextState;
    }), []);

    const accordionItemClassName = kwtClassNames("accordion-item", className, {
        open: openItems && openItems.includes(props.title),
        disabled
    });

    return <div className={ accordionItemClassName } ref={ ref } onClick={ onComponentClick }>
        <span children={ props.title } />
        <div className="content">
            { props.children }
        </div>
    </div>;
}));