import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{
    constructor(){}
    

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }

    @HostBinding('class.open') isOpen = false;
}