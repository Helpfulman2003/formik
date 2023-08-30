import { Drawer } from 'antd'
import React from 'react'

export default function DrawerComponent({ children, title = 'Drawer', placement = 'right', isOpen, ...rests }) {
    return (
      <Drawer title={title} placement={placement}  open={isOpen} {...rests}>
        {children}
      </Drawer>
    );
}

