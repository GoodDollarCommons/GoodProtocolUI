/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '../functions/styling'
import { ExternalLink } from './Link'
import { ReactComponent as MenuIcon } from '../assets/images/menu.svg'
import { t } from '@lingui/macro'
import { I18n } from '@lingui/core'
import { useLingui } from '@lingui/react'
import useTheme from '../hooks/useTheme'

const items = (i18n: I18n) => [
    {
        name: i18n._(t`Docs`),
        description: i18n._(t`Documentation for users of Sushi.`),
        href: 'https://docs.sushi.com'
    },
    {
        name: i18n._(t`Dev`),
        description: i18n._(t`Documentation for developers of Sushi.`),
        href: 'https://dev.sushi.com'
    },
    {
        name: i18n._(t`Open Source`),
        description: i18n._(t`Sushi is a supporter of Open Source.`),
        href: 'https://github.com/sushiswap'
    },
    {
        name: i18n._(t`Tools`),
        description: i18n._(t`Tools to optimize your workflow.`),
        href: '/tools'
    },
    {
        name: i18n._(t`Discord`),
        description: i18n._(t`Join the community on Discord.`),
        href: 'https://discord.gg/NVPXN4e'
    }
]

export default function Menu() {
    const { i18n } = useLingui()
    const solutions = items(i18n)
    const theme = useTheme()

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button className={classNames(open ? '' : '', 'focus:outline-none')}>
                        <MenuIcon
                            title="More"
                            className={classNames(open ? '' : '', 'inline-flex items-center ml-2 h-5 w-5 group- ')}
                            aria-hidden="true"
                        />
                    </Popover.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            static
                            className="absolute z-10 bottom-12 lg:top-12 left-full transform -translate-x-full mt-3 px-2 w-screen max-w-xs sm:px-0"
                        >
                            <div
                                className="rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                                style={{
                                    background: theme.color.main
                                }}
                            >
                                <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                                    {solutions.map(item => (
                                        <ExternalLink
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 p-3 block rounded-md transition ease-in-out duration-150"
                                        >
                                            <p className="  ">{item.name}</p>
                                            <p className="mt-1  ">{item.description}</p>
                                        </ExternalLink>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
