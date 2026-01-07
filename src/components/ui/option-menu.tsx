import { Button } from '@heroui/button'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'
import { MoreVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { DeleteIcon } from './delete'
import { EyeIcon } from './eye'
import { SquarePenIcon } from './square-pen'

export type OptionMenuItem = {
  title: string
  icon?: React.ReactNode
  type?: 'view' | 'edit' | 'delete'
  onClick: () => void
  isSeparator?: boolean
}

interface OptionMenuProps {
  trigger?: React.ReactNode
  triggerIcon?: React.ReactNode
  options?: OptionMenuItem[]
  disableCloseOnAction?: boolean
}

const OptionMenu = (props: OptionMenuProps) => {
  const [open, setOpen] = useState(false)

  const handleAction = (option: OptionMenuItem) => {
    if (!!option?.onClick) option?.onClick()

    if (!props?.disableCloseOnAction) setOpen(false)
  }

  return (
    <Popover isOpen={open} placement='bottom-end' onOpenChange={setOpen}>
      <PopoverTrigger>
        {props?.trigger ? (
          props?.trigger
        ) : (
          <Button isIconOnly size='sm' variant='light'>
            {props?.triggerIcon ? props?.triggerIcon : <MoreVerticalIcon className='text-default-300' />}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className='p-1'>
        <Listbox className='min-w-36' aria-label='Actions' variant='flat' onAction={() => setOpen(false)}>
          {(props?.options || []).map(option => (
            <>
              {option.type === 'view' ? (
                <ViewListItem
                  title={option.title}
                  onClick={() => {
                    handleAction(option)
                  }}
                />
              ) : option.type === 'edit' ? (
                <EditListItem
                  title={option.title}
                  onClick={() => {
                    handleAction(option)
                  }}
                />
              ) : option.type === 'delete' ? (
                <DeleteListItem
                  title={option.title}
                  onClick={() => {
                    handleAction(option)
                  }}
                />
              ) : (
                <ListboxItem
                  onClick={() => {
                    handleAction(option)
                  }}
                  key={option.title}
                  startContent={!!option?.icon ? option.icon : null}
                >
                  {option.title}
                </ListboxItem>
              )}
            </>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}

export default OptionMenu

export const ViewListItem = ({ title, onClick }: { title?: string; onClick?: () => void }) => {
  return (
    <ListboxItem key='view' onClick={onClick} startContent={<EyeIcon size={16} />}>
      {title || 'View'}
    </ListboxItem>
  )
}

export const EditListItem = ({ title, onClick }: { title?: string; onClick?: () => void }) => {
  return (
    <ListboxItem key='edit' startContent={<SquarePenIcon size={16} />} onClick={onClick}>
      {title || 'Edit'}
    </ListboxItem>
  )
}

export const DeleteListItem = ({ title, onClick }: { title?: string; onClick?: () => void }) => {
  return (
    <ListboxItem key='delete' startContent={<DeleteIcon size={16} />} onClick={onClick}>
      {title || 'Delete'}
    </ListboxItem>
  )
}
