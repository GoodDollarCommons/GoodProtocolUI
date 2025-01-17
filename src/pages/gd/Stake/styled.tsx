import styled from 'styled-components'
import { TableSC } from 'components/gd/Table'

export const Wrapper = styled.div`
    background: ${({ theme }) => theme.color.bg1};
    box-shadow: ${({ theme }) => theme.shadow.settings};
    border-radius: 12px;
    padding: 14px 19px 15px 19px;

    ${TableSC} {
        tr:not(.mobile) {
            td:first-child {
                width: 65px;
                padding-right: 0;
            }
        }

        @media screen and (max-width: 1310px) {
            td,
            th {
                &:nth-child(1) {
                    display: none;
                }
            }

            td:nth-child(2) {
                border-left: 1px solid ${({ theme }) => theme.color.border2};
                border-top-left-radius: 12px;
                border-bottom-left-radius: 12px;
            }
        }

        @media screen and (max-width: 1240px) {
            td,
            th {
                &:nth-child(3) {
                    display: none;
                }
            }
        }

        @media screen and (max-width: 1120px) {
            td,
            th {
                &:nth-child(6) {
                    display: none;
                }
            }
        }

        @media ${({ theme }) => theme.media.md} {
            td,
            th {
                text-align: center;

                &:nth-child(5),
                &:nth-child(6),
                &:nth-child(8) {
                    display: none;
                }
            }

            th {
                padding-left: 26px !important;
                padding-right: 8px !important;
            }
            td {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            td:nth-child(2) {
                border-bottom-left-radius: unset;
            }

            td:nth-child(7) {
                border-right: 1px solid ${({ theme }) => theme.color.border2};
                border-top-right-radius: 12px;
            }
        }
    }
`

export const Switch = styled.div`
    position: relative;
    width: 36px;
    height: 22px;

    .area {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${({ theme }) => theme.color.text2};
        border-radius: 12px;
    }
    .toggle {
        position: absolute;
        top: 1px;
        left: 0;
        transform: translateX(1px);
        width: 20px;
        height: 20px;
        background-color: ${({ theme }) => theme.color.main};
        box-shadow: 0 1.375px 1.375px rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        transition: 0.3s;
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        opacity: 0;
        border: none;
        z-index: 1;
        cursor: pointer;
    }

    input:checked + .toggle {
        left: 100%;
        transform: translateX(calc(-100% - 1px));
    }
`
