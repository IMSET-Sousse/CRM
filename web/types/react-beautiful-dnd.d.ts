declare module 'react-beautiful-dnd' {
  import * as React from 'react'

  export interface DraggableLocation {
    droppableId: string
    index: number
  }

  export interface DragResult {
    draggableId: string
    type: string
    source: DraggableLocation
    destination: DraggableLocation | null
    reason: 'DROP' | 'CANCEL'
  }

  export interface DropResult extends DragResult {
    combine: DraggableLocation | null
  }

  export interface DraggableProvided {
    draggableProps: {
      style?: React.CSSProperties
      [key: string]: any
    }
    dragHandleProps: {
      [key: string]: any
    } | null
    innerRef: (element: HTMLElement | null) => void
  }

  export interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void
    placeholder?: React.ReactNode
    droppableProps: {
      [key: string]: any
    }
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean
    isDropAnimating: boolean
    isClone: boolean
    dropAnimation: {
      duration: number
      curve: string
      moveTo: {
        x: number
        y: number
      }
    } | null
    draggingOver: string | null
    combineWith: string | null
    combineTargetFor: string | null
    mode: 'FLUID' | 'SNAP' | null
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean
    draggingOverWith: string | null
    draggingFromThisWith: string | null
    isUsingPlaceholder: boolean
  }

  export interface DraggableProps {
    draggableId: string
    index: number
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactNode
    isDragDisabled?: boolean
    disableInteractiveElementBlocking?: boolean
    shouldRespectForcePress?: boolean
  }

  export interface DroppableProps {
    droppableId: string
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactNode
    type?: string
    mode?: 'standard' | 'virtual'
    isDropDisabled?: boolean
    isCombineEnabled?: boolean
    direction?: 'horizontal' | 'vertical'
    ignoreContainerClipping?: boolean
    renderClone?: (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableProps) => React.ReactNode
    getContainerForClone?: () => HTMLElement
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void
    onDragStart?: (initial: DragResult) => void
    onDragUpdate?: (update: DragResult) => void
    children: React.ReactNode
  }

  export class DragDropContext extends React.Component<DragDropContextProps> {}
  export class Droppable extends React.Component<DroppableProps> {}
  export class Draggable extends React.Component<DraggableProps> {}
} 