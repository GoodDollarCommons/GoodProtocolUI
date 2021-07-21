import React, { memo } from 'react'
import { Layout } from '../../kashi'
import { PortfolioAnalyticSC, PortfolioSC, PortfolioTitleSC, PortfolioValueSC } from './styled'
import Title from '../../components/gd/Title'
import Card from '../../components/gd/Card'
import { ButtonDefault } from '../../components/gd/Button'
import Table from '../../components/gd/Table'
import WithdrawRewards from 'components/WithdrawRewards'
import PortfolioTableRow from 'components/PortfolioTableRow'

const Portfolio = () => {
    return (
        <Layout>
            <PortfolioSC>
                <Title className="mb-6 pl-4">Portfolio</Title>
                <Card className="mb-4">
                    <PortfolioAnalyticSC className="flex">
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">My Stake</Title>
                            <PortfolioValueSC>~$30,000</PortfolioValueSC>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">
                                Total Rewards to Date <br /> (G$ & GDAO)
                            </Title>
                            <PortfolioValueSC>~1,000 G$</PortfolioValueSC>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">G$ Rewards</Title>
                            <PortfolioValueSC>$100</PortfolioValueSC>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">GDAO Rewards</Title>
                            <PortfolioValueSC>~1,000 GDAO</PortfolioValueSC>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">Your social contribution from:</Title>
                        </div>
                    </PortfolioAnalyticSC>
                </Card>
                <Card className="mb-4">
                    <PortfolioAnalyticSC className="flex">
                        <div className="flex flex-col justify-center flex-grow">
                            <PortfolioTitleSC className="claimable-rewards">
                                Claimable <br /> rewards
                            </PortfolioTitleSC>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">G$ Rewards</Title>
                            <PortfolioValueSC>~1,000 G$ / ~$100</PortfolioValueSC>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <Title type="category">GDAO Rewards</Title>
                            <PortfolioValueSC>~1,000 GDAO</PortfolioValueSC>
                        </div>
                        <div className="flex flex-col justify-center items-end flex-grow">
                            <WithdrawRewards
                                trigger={<ButtonDefault width={'156px'}>Withdraw rewards</ButtonDefault>}
                            />
                        </div>
                    </PortfolioAnalyticSC>
                </Card>
                <PortfolioTitleSC className="mb-3 pl-2">Ethereum</PortfolioTitleSC>
                <Card contentWrapped={false}>
                    <Table
                        header={
                            <tr>
                                <th>
                                    <Title type={'category'}>TYPE</Title>
                                </th>
                                <th>
                                    <Title type={'category'}>TOKEN</Title>
                                </th>
                                <th>
                                    <Title type={'category'}>PROTOCOL</Title>
                                </th>
                                <th>
                                    <Title type={'category'}>STAKE</Title>
                                </th>
                                <th>
                                    <Title type={'category'}>G$ REWARDS</Title>
                                </th>
                                <th>
                                    <Title type={'category'}>MULTIPLIER</Title>
                                </th>
                                <th>
                                    <Title type={'category'}>GDAO REWARDS</Title>
                                </th>
                                <th></th>
                            </tr>
                        }
                    >
                        <PortfolioTableRow />
                        <PortfolioTableRow />
                    </Table>
                </Card>
            </PortfolioSC>
        </Layout>
    )
}

export default memo(Portfolio)
