"use client";

import { useState } from "react";
import styled from "styled-components";
import * as Tooltip from '@radix-ui/react-tooltip';
import { Text, Flex, Box, Card, Heading, Badge } from '@radix-ui/themes';
import SeatCard, { Seat, SeatStatus } from "./components/seat-card";

// // Radix UIのBadgeコンポーネントが受け付ける色の型
// type BadgeColor = "ruby" | "green" | "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "mint";

export default function Home() {
  // 座席データの状態管理（仮のデータ）
  const [seats, setSeats] = useState<Seat[]>(() => {
    // 4行6列の座席を生成
    const initialSeats: Seat[] = [];
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 6; col++) {
        // ランダムな座席状態を生成（デモ用）
        const statuses: SeatStatus[] = ["available", "reserved", "occupied", "unavailable"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // 予約済みまたは使用中の場合はユーザー名を追加
        let user: string | undefined = undefined;
        if (randomStatus === "reserved" || randomStatus === "occupied") {
          const users = ["田中太郎", "鈴木花子", "佐藤次郎", "山田優子"];
          user = users[Math.floor(Math.random() * users.length)];
        }
        
        initialSeats.push({
          id: `${row}-${col}`,
          status: randomStatus,
          user
        });
      }
    }
    return initialSeats;
  });

  // 選択された座席の状態
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // 座席の状態を変更する関数
  const handleChangeStatus = (seat: Seat, newStatus: SeatStatus) => {
    setSeats(prevSeats => 
      prevSeats.map(s => 
        s.id === seat.id 
          ? { 
              ...s, 
              status: newStatus,
              // 予約済みまたは使用中の場合はユーザー名を追加、空席の場合は削除
              user: newStatus === "available" ? undefined : s.user || "新規ユーザー"
            } 
          : s
      )
    );
    
    // 選択中の座席も更新
    if (selectedSeat && selectedSeat.id === seat.id) {
      setSelectedSeat({
        ...selectedSeat,
        status: newStatus,
        user: newStatus === "available" ? undefined : selectedSeat.user || "新規ユーザー"
      });
    }
  };

  // // 座席の状態に応じたバッジの色を取得
  // const getSeatStatusColor = (status: SeatStatus): BadgeColor => {
  //   switch (status) {
  //     case "available": return "green";
  //     case "reserved": return "amber";
  //     case "occupied": return "tomato";
  //     case "unavailable": return "gray";
  //     default: return "gray";
  //   }
  // };

  return (
    <main>
      <Container>
        <Card size="3" style={{ width: '100%', maxWidth: '1000px' }}>
          <Heading size="6" mb="4">オフィス座席表</Heading>
          
          <Flex gap="4" mb="4">
            <Text weight="bold">凡例:</Text>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Badge color="green" size="2">空席</Badge>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    <Text size="1">予約可能な座席です</Text>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Badge color="amber" size="2">予約済み</Badge>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    <Text size="1">予約されている座席です</Text>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Badge color="tomato" size="2">使用中</Badge>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    <Text size="1">現在使用されている座席です</Text>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Badge color="gray" size="2">利用不可</Badge>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    <Text size="1">使用できない座席です</Text>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </Flex>
          
          <Box style={{ overflowX: 'auto', padding: '10px 0' }}>
            <SeatGrid>
              {seats.map((seat) => (
                <SeatCard 
                  key={seat.id} 
                  seat={seat} 
                  onStatusChange={handleChangeStatus}
                  onSeatSelect={setSelectedSeat}
                />
              ))}
            </SeatGrid>
          </Box>
        </Card>
      </Container>
    </main>
  );
}

// スタイル付きコンポーネント
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin: 20px 0;
  min-width: 600px;
`;
