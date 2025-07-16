import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { MulticheckboxComponent } from '../multicheckbox/multicheckbox.component';
import { OurStoryComponent } from '../our-story/our-story.component';
@Component({
  selector: 'app-checkbox',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MulticheckboxComponent,
    OurStoryComponent,
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  // options = [
  //   { title: 'add cheese', cost: 20 },
  //   { title: 'add onion extra', cost: 10 },
  //   { title: 'add extra sauce', cost: 30 },
  // ];
  // // checkboxOne: FormGroup;
  // checkboxGroup: FormGroup;
  // // checkboxForm: FormGroup;
  // constructor(private formBuilder: FormBuilder) {
  //   // this.checkboxOne = this.formBuilder.group({
  //   //   checkOne: [false],
  //   // });
  //   this.checkboxGroup = this.formBuilder.group({
  //     checkboxes: this.formBuilder.array([]),
  //   });
  //   this.addCheckboxes();
  //   // this.checkboxForm = this.formBuilder.group({
  //   //   agreeTerms: [false, Validators.requiredTrue], // Checkbox must be checked
  //   // });
  //   // this.checkboxOne.get('checkOne')?.valueChanges?.subscribe((value) => {
  //   //   console.log(value);
  //   // });
  // }
  // get checkboxes() {
  //   return this.checkboxGroup.get('cehckboxes') as FormArray;
  // }
  // addCheckboxes() {
  //   // this?.options?.forEach(() => {
  //   //   this.checkboxes.push(this.formBuilder.control(false));
  //   // });
  //   if (this.checkboxes) {
  //     this.options.forEach(() => {
  //       // Each checkbox starts with a value of 'false' (unchecked)
  //       this.checkboxes.push(this.formBuilder.control(false)); // Add a new checkbox to the FormArray
  //     });
  //   } else {
  //     console.error('FormArray is not properly initialized!');
  //   }
  // }
  // getSelectedValues() {
  //   const selectedOptions = this.checkboxGroup.value.checkboxes;
  //   console.log(selectedOptions);
  // }
  // // get agree() {
  // //   console.log(this.checkboxForm.get('agreeTerms')?.touched);
  // //   return this.checkboxForm.get('agreeTerms');
  // // }
  // // // ussing change method
  // // onChange(e: any) {
  // //   console.log(e?.target?.value, e?.target?.checked);
  // // }
  // // using reactive forms subscribe
  // hello() {}
}


// new code added for canvas 

import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Block {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  zIndex: number;
}

@Component({
  selector: 'app-preview',
  imports: [CommonModule, FormsModule],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements AfterViewInit {
  @ViewChild('canvasWrapper') canvaWrapperRef!: ElementRef;
  @ViewChild('previewWarehouse')
  previewWarehouseRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('components') componentsRef!: ElementRef;
  @ViewChild('controlls') controllsRef!: ElementRef;

  private ctx!: CanvasRenderingContext2D;
  canvasWrapperEl: any;
  previewWarehouseEl: any;
  canvasHeight: number = 0;
  canvasWidth: number = 0;
  scale: number = 1;
  resizeHandleSize: number = 10;
  currentCursor: string = 'default';
  currentShapeIndex: number | null = null;
  isDragging: boolean = false;
  isResizing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  resizeCorner: string | null = null;
  selectedComponent: { [key: string]: any } = {};
  blocks: Block[] = [];
  selectedBlock: Block | null = null;
  draggingBlock: Block | null = null;
  resizingBlock: Block | null = null;
  resizeDirection: string | null = null;
  dragOffsetX: number = 0;
  dragOffsetY: number = 0;

  components: any[] = [
    {
      name: 'pallet',
      height: 100,
      width: 300,
      color: '#86efac',
    },
    {
      name: 'block',
      height: 60,
      width: 200,
      color: '#d6d3d1',
    },
    {
      name: 'shelves',
      height: 100,
      width: 300,
      color: '#fff',
    },
    {
      name: 'storageRack',
      height: 80,
      width: 400,
      color: '#bfdbfe',
    },
    {
      name: 'equipment',
      height: 40,
      width: 80,
      color: '#e9d5ff',
    },
    {
      name: 'officeSpace',
      height: 200,
      width: 300,
      color: '#cdcdff',
    },
    {
      name: 'loadingDock',
      height: 200,
      width: 300,
      color: '#fecaca',
    },
    {
      name: 'safetyZone',
      height: 150,
      width: 150,
      color: '#fed7aa',
    },
    {
      name: 'bulb',
      height: 50,
      width: 100,
      color: '#fff5ad',
    },
    {
      name: 'lines',
      height: 140,
      width: 300,
      color: '#acff90',
    },
  ];

  // for controlling the process
  isShowProcess: boolean = true;
  currentProcessIndex: number = 0;
  process: any[] = [
    {
      title: 'Welcome to Our App !👋',
      message:
        "Let's take a quick tour to show you around and help you get started.",
      top: '41%',
      left: '40%',
      iTop: true,
      iRight: false,
      id: 0,
    },
    {
      title: 'Please, click any of component from here',
      message:
        'It will reflect one the right side box, where you can see the preview!',
      iTop: false,
      iRight: false,
      id: 1,
    },
    {
      title: 'Controll the sizing of preview',
      message: 'Form here you can zoom in and zoom out the preivew',
      iTop: false,
      iRight: false,
      id: 2,
    },
    {
      title: 'Drag and Drop',
      message:
        'You can change the position of the component by dragging inside the preivew box.',
      iTop: false,
      iRight: false,
      id: 3,
    },
  ];
  controlPos: any;
  componentPos: any;
  previewWarehousePos: any;

  componentsEl: any;
  controllsEl: any;

  constructor() {}

  ngAfterViewInit() {
    this.canvasWrapperEl = this.canvaWrapperRef.nativeElement;
    this.previewWarehouseEl = this.previewWarehouseRef.nativeElement;
    this.ctx = this.previewWarehouseEl.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    this.canvasHeight = this.canvasWrapperEl.clientHeight;
    this.canvasWidth = this.canvasWrapperEl.clientWidth + 10;
    this.setCanvasDimensions();
    this.drawGridLine();

    this.previewWarehouseEl.style.cursor = this.currentCursor;

    // Add event listeners
    this.previewWarehouseEl.addEventListener(
      'mousedown',
      this.onMouseDown.bind(this)
    );
    this.previewWarehouseEl.addEventListener(
      'mouseup',
      this.onMouseUp.bind(this)
    );
    this.previewWarehouseEl.addEventListener(
      'mouseout',
      this.onMouseOut.bind(this)
    );
    this.previewWarehouseEl.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );

    // for process
    this.controllsEl = this.controllsRef.nativeElement;
    this.componentsEl = this.componentsRef.nativeElement;
    this.getPositions();
    this.onSetProcessPosition();
  }

  drawGridLine() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    const width = this.canvasWidth / this.scale;
    const height = this.canvasHeight / this.scale;
    const gridSize = 15;

    this.ctx.strokeStyle = '#ddd';
    this.ctx.lineWidth = 1 / this.scale;

    // Draw grid lines
    for (let x = 0; x <= width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }

    this.drawShapes();
    this.ctx.restore();
  }

  drawShapes(): void {
    this.blocks.forEach((block) => {
      this.drawBlock(block);
    });
  }

  drawBlock(block: Block) {
    this.ctx.fillStyle = block.color;
    this.ctx.fillRect(block.x, block.y, block.width, block.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = `${15 / this.scale}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      block.type,
      block.x + block.width / 2,
      block.y + block.height / 2
    );

    if (this.selectedBlock === block) {
      this.ctx.strokeStyle = 'black';
      this.ctx.setLineDash([5, 3]);
      this.ctx.lineWidth = 2 / this.scale;
      this.ctx.strokeRect(block.x, block.y, block.width, block.height);
      this.ctx.setLineDash([]);

      // Only draw resize handles if not dragging
      if (!this.draggingBlock) {
        this.drawResizeHandles(block);
      }
    }
  }

  drawResizeHandles(block: Block): void {
    const handleSize = this.resizeHandleSize / this.scale;
    const directions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    const handles = this.getResizeHandles(block);

    this.ctx.fillStyle = '#000'; // Black color for resize handles

    directions.forEach((dir) => {
      const handle = handles[dir];
      if (handle) {
        this.ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
      }
    });
  }

  getResizeHandles(block: Block): Record<string, { x: number; y: number }> {
    const handleSize = this.resizeHandleSize / this.scale;
    const halfSize = handleSize / 2;
    const { x, y, width, height } = block;

    return {
      nw: { x: x - halfSize, y: y - halfSize },
      n: { x: x + width / 2 - halfSize, y: y - halfSize },
      ne: { x: x + width - halfSize, y: y - halfSize },
      e: { x: x + width - halfSize, y: y + height / 2 - halfSize },
      se: { x: x + width - halfSize, y: y + height - halfSize },
      s: { x: x + width / 2 - halfSize, y: y + height - halfSize },
      sw: { x: x - halfSize, y: y + height - halfSize },
      w: { x: x - halfSize, y: y + height / 2 - halfSize },
    };
  }

  onMouseDown(event: MouseEvent) {
    const pos = this.getMousePosition(event);
    const sortedBlocks = [...this.blocks].sort((a, b) => b.zIndex - a.zIndex);

    // Check if we're clicking on a resize handle
    if (this.selectedBlock) {
      const handles = this.getResizeHandles(this.selectedBlock);
      const hs = this.resizeHandleSize / this.scale;
      for (const dir of ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']) {
        const h = handles[dir];
        if (
          pos.x >= h.x &&
          pos.x <= h.x + hs &&
          pos.y >= h.y &&
          pos.y <= h.y + hs
        ) {
          this.resizingBlock = this.selectedBlock;
          this.resizeDirection = dir;
          this.startX = pos.x;
          this.startY = pos.y;
          this.currentCursor = this.getCursorForDirection(dir);
          this.previewWarehouseEl.style.cursor = this.currentCursor;
          this.drawGridLine();
          return;
        }
      }
    }

    // Check if we're clicking on a block
    for (const block of sortedBlocks) {
      if (
        pos.x >= block.x &&
        pos.x <= block.x + block.width &&
        pos.y >= block.y &&
        pos.y <= block.y + block.height
      ) {
        this.selectedBlock = block;
        this.draggingBlock = block;
        this.startX = pos.x;
        this.startY = pos.y;
        this.dragOffsetX = pos.x - block.x;
        this.dragOffsetY = pos.y - block.y;
        this.currentCursor = 'move';
        this.previewWarehouseEl.style.cursor = this.currentCursor;
        this.drawGridLine();
        return;
      }
    }

    // Clicked on empty space, deselect
    this.selectedBlock = null;
    this.currentCursor = 'default';
    this.previewWarehouseEl.style.cursor = this.currentCursor;
    this.drawGridLine();
  }

  onMouseMove(event: MouseEvent) {
    const pos = this.getMousePosition(event);

    if (this.resizingBlock && this.resizeDirection) {
      this.resizeSelectedBlock(pos);
      this.drawGridLine();
      this.currentCursor = this.getCursorForDirection(this.resizeDirection);
      this.previewWarehouseEl.style.cursor = this.currentCursor;
      return;
    }

    if (this.draggingBlock) {
      const canvasW = this.previewWarehouseEl.width / this.scale;
      const canvasH = this.previewWarehouseEl.height / this.scale;

      let newX = pos.x - this.dragOffsetX;
      let newY = pos.y - this.dragOffsetY;

      // Constrain within canvas bounds
      newX = Math.max(0, Math.min(newX, canvasW - this.draggingBlock.width));
      newY = Math.max(0, Math.min(newY, canvasH - this.draggingBlock.height));

      this.draggingBlock.x = newX;
      this.draggingBlock.y = newY;
      this.currentCursor = 'move';
      this.previewWarehouseEl.style.cursor = this.currentCursor;
      this.drawGridLine();
      return;
    }

    // Check if hovering over a block for resizing
    let isHoveringResizeHandle = false;
    for (const block of this.blocks) {
      if (
        this.selectedBlock === block &&
        pos.x >= block.x &&
        pos.x <= block.x + block.width &&
        pos.y >= block.y &&
        pos.y <= block.y + block.height
      ) {
        const handles = this.getResizeHandles(block);
        const hs = this.resizeHandleSize / this.scale;

        for (const dir of ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']) {
          const h = handles[dir];
          if (
            pos.x >= h.x &&
            pos.x <= h.x + hs &&
            pos.y >= h.y &&
            pos.y <= h.y + hs
          ) {
            isHoveringResizeHandle = true;
            this.currentCursor = this.getCursorForDirection(dir);
            this.previewWarehouseEl.style.cursor = this.currentCursor;
            return;
          }
        }
      }
    }

    // If not hovering over a resize handle, reset cursor
    if (!isHoveringResizeHandle) {
      this.currentCursor = 'default';
      this.previewWarehouseEl.style.cursor = this.currentCursor;
    }
  }

  getCursorForDirection(direction: string): string {
    switch (direction) {
      case 'nw':
      case 'se':
        return 'nwse-resize';
      case 'ne':
      case 'sw':
        return 'nesw-resize';
      case 'n':
      case 's':
        return 'ns-resize';
      case 'e':
      case 'w':
        return 'ew-resize';
      default:
        return 'default';
    }
  }

  onMouseUp(event: MouseEvent) {
    this.draggingBlock = null;
    this.resizingBlock = null;
    this.resizeDirection = null;
    this.currentCursor = 'default';
    this.previewWarehouseEl.style.cursor = this.currentCursor;
  }

  onMouseOut(event: MouseEvent) {
    this.onMouseUp(event);
  }

  getMousePosition(event: MouseEvent) {
    const rect = this.previewWarehouseEl.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / this.scale,
      y: (event.clientY - rect.top) / this.scale,
    };
  }

  resizeSelectedBlock(pos: { x: number; y: number }): void {
    if (!this.resizingBlock || !this.resizeDirection) return;

    const block = this.resizingBlock;
    const minSize = 50;
    const right = block.x + block.width;
    const bottom = block.y + block.height;

    console.log(block);
    if (this.resizeDirection.includes('n')) {
      const newHeight = bottom - pos.y;
      if (newHeight >= minSize && pos.y >= 0) {
        block.y = pos.y;
        block.height = newHeight;
      }
    }
    if (this.resizeDirection.includes('s')) {
      const newHeight = pos.y - block.y;
      if (
        newHeight >= minSize &&
        pos.y <= this.previewWarehouseEl.height / this.scale
      ) {
        block.height = newHeight;
      }
    }
    if (this.resizeDirection.includes('w')) {
      const newWidth = right - pos.x;
      if (newWidth >= minSize && pos.x >= 0) {
        block.x = pos.x;
        block.width = newWidth;
      }
    }
    if (this.resizeDirection.includes('e')) {
      const newWidth = pos.x - block.x;
      if (
        newWidth >= minSize &&
        pos.x <= this.previewWarehouseEl.width / this.scale
      ) {
        block.width = newWidth;
      }
    }
  }

  onAddComponent(type: string) {
    const component = this.components.find((com) => com.name === type);

    if (!component) return;
    const newBlock: Block = {
      type,
      x: this.previewWarehouseEl.width / this.scale / 2 - component.width / 2,
      y: this.previewWarehouseEl.height / this.scale / 2 - component.height / 2,
      width: component.width,
      height: component.height,
      zIndex:
        this.blocks.length > 0
          ? Math.max(...this.blocks.map((s) => s.zIndex)) + 1
          : 0,
      color: component.color,
    };

    this.blocks.push(newBlock);
    this.selectedBlock = newBlock;
    this.drawGridLine();
  }

  zoomIn() {
    this.scale *= 1.2;
    this.drawGridLine();
  }

  zoomOut() {
    this.scale /= 1.2;
    this.drawGridLine();
  }

  setCanvasDimensions() {
    this.previewWarehouseEl.width = this.canvasWidth;
    this.previewWarehouseEl.height = this.canvasHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.canvasHeight = this.canvasWrapperEl.offsetHeight;
    this.canvasWidth = this.canvasWrapperEl.offsetWidth;
    this.setCanvasDimensions();
    this.drawGridLine();
  }

  // this function for getting the position of item where I will show the process
  // this code for showing the process
  getPositions() {
    console.log('called');
    this.controlPos = this.controllsEl.getBoundingClientRect();
    console.log(this.controlPos);
    this.componentPos = this.componentsEl.getBoundingClientRect();
    this.previewWarehousePos = this.previewWarehouseEl.getBoundingClientRect();
    console.log(this.controllsEl, this.componentsEl, this.previewWarehouseEl);
    console.log(
      this.componentPos,
      'component pos',
      this.controlPos,
      'controll pos',
      this.previewWarehousePos,
      'preview pos'
    );
  }

  onSetProcess(currentIndex: number, componentPos: any) {
    let currentProcess = this.process[this.currentProcessIndex];
    let windowWidth = window.innerWidth;
    let top = currentIndex === 3 ? componentPos.y + 10 : componentPos.y;
    let left = currentIndex === 3 ? componentPos.x + 20 : componentPos.x - 320;
    let iTop;
    let iRight;
    if (windowWidth >= 999) {
      iTop = currentIndex === 3 ? true : false;
      iRight = currentIndex === 3 ? false : true;
    }

    if (windowWidth <= 999) {
      currentProcess = {
        ...currentProcess,
        top: `${top + 30}px`,
        left: `20%`,
        iTop: true,
        iRight: false,
      };
    } else {
      currentProcess = {
        ...currentProcess,
        top: `${top}px`,
        left: `${left}px`,
        iRight: iRight,
        iTop: iTop,
      };
    }
    this.process = [
      ...this.process.slice(0, this.currentProcessIndex),
      currentProcess,
      ...this.process.slice(this.currentProcessIndex + 1),
    ];
  }

  onSetProcessPosition() {
    this.getPositions();
    switch (this.currentProcessIndex) {
      case 1:
        this.onSetProcess(this.currentProcessIndex, this.componentPos);
        break;
      case 2:
        this.onSetProcess(this.currentProcessIndex, this.controlPos);
        break;
      case 3:
        this.onSetProcess(this.currentProcessIndex, this.previewWarehousePos);
        break;
      default:
        return;
    }
  }

  onChangeNext() {
    this.currentProcessIndex += 1;
    this.onSetProcessPosition();
    if (this.currentProcessIndex === this.process.length) {
      this.isShowProcess = false;
    }
  }
  onChangePrevious() {
    if (this.currentProcessIndex <= 0) {
      this.currentProcessIndex = 0;
      return;
    }
    this.currentProcessIndex -= 1;
    this.onSetProcessPosition();
  }

  onCancelProcess() {
    this.isShowProcess = false;
    this.currentProcessIndex = 0;
  }

  // ends here
}

