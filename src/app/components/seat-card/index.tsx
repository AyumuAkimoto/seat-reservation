"use client";

import { useState } from "react";
import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { Button, Text, Flex, Badge } from '@radix-ui/themes';

// 座席の状態を表す型
export type SeatStatus = "available" | "reserved" | "occupied" | "unavailable";

// 座席の情報を表す型
export interface Seat {
  id: string;
  status: SeatStatus;
  user?: string;
}

// Radix UIのBadgeコンポーネントが受け付ける色の型
type BadgeColor = "ruby" | "green" | "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "mint";

// 座席の状態に応じたスタイルを適用するためのスタイル付きコンポーネント
const SeatContainer = styled.div<{ status: SeatStatus }>`
  width: 80px;
  height: 60px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: ${props => props.status === "unavailable" ? "not-allowed" : "pointer"};
  background-color: ${props => {
    switch (props.status) {
      case "available": return "#e6f7e6";
      case "reserved": return "#fff3e0";
      case "occupied": return "#ffebee";
      case "unavailable": return "#f5f5f5";
      default: return "#ffffff";
    }
  }};
  border: 2px solid ${props => {
    switch (props.status) {
      case "available": return "#4caf50";
      case "reserved": return "#ff9800";
      case "occupied": return "#f44336";
      case "unavailable": return "#9e9e9e";
      default: return "#e0e0e0";
    }
  }};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;
  
  /* 机っぽい見た目を追加 */
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    height: 10px;
    background-color: ${props => {
      switch (props.status) {
        case "available": return "#4caf50";
        case "reserved": return "#ff9800";
        case "occupied": return "#f44336";
        case "unavailable": return "#9e9e9e";
        default: return "#e0e0e0";
      }
    }};
    opacity: 0.3;
    border-radius: 8px 8px 0 0;
  }
  
  &:hover {
    transform: ${props => props.status === "unavailable" ? "none" : "translateY(-2px)"};
    box-shadow: ${props => props.status === "unavailable" ? "none" : "0 4px 8px rgba(0, 0, 0, 0.15)"};
  }
`;

interface SeatCardProps {
  seat: Seat;
  onStatusChange: (seat: Seat, newStatus: SeatStatus) => void;
  onSeatSelect: (seat: Seat) => void;
}

export default function SeatCard({ seat, onStatusChange, onSeatSelect }: SeatCardProps) {
  // 座席の状態に応じたバッジの色を取得
  const getSeatStatusColor = (status: SeatStatus): BadgeColor => {
    switch (status) {
      case "available": return "green";
      case "reserved": return "amber";
      case "occupied": return "tomato";
      case "unavailable": return "gray";
      default: return "gray";
    }
  };

  // 座席の状態に応じた表示テキストを取得
  const getSeatStatusText = (status: SeatStatus): string => {
    switch (status) {
      case "available": return "空席";
      case "reserved": return "予約済み";
      case "occupied": return "使用中";
      case "unavailable": return "利用不可";
      default: return "不明";
    }
  };

  return (
    <Popover.Root>
      <Dialog.Root>
        <Popover.Trigger asChild>
          <SeatContainer 
            status={seat.status} 
            onClick={() => onSeatSelect(seat)}
          >
            <Text size="2">{seat.id}</Text>
          </SeatContainer>
        </Popover.Trigger>
        
        <Popover.Portal>
          <Popover.Content sideOffset={5} align="center">
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <Flex direction="column" gap="2">
                <Text weight="bold">座席: {seat.id}</Text>
                <Flex gap="2" align="center">
                  <Text size="2">状態:</Text>
                  <Badge color={getSeatStatusColor(seat.status)}>
                    {getSeatStatusText(seat.status)}
                  </Badge>
                </Flex>
                {seat.user && (
                  <Text size="2">利用者: {seat.user}</Text>
                )}
                
                <Flex gap="2" wrap="wrap">
                  <Button 
                    size="1" 
                    color="green" 
                    variant="soft"
                    disabled={seat.status === "unavailable"}
                    onClick={() => onStatusChange(seat, "available")}
                  >
                    空席
                  </Button>
                  <Button 
                    size="1" 
                    color="amber" 
                    variant="soft"
                    disabled={seat.status === "unavailable"}
                    onClick={() => onStatusChange(seat, "reserved")}
                  >
                    予約
                  </Button>
                  <Button 
                    size="1" 
                    color="tomato" 
                    variant="soft"
                    disabled={seat.status === "unavailable"}
                    onClick={() => onStatusChange(seat, "occupied")}
                  >
                    使用
                  </Button>
                </Flex>
              </Flex>
            </div>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>

        <Dialog.Portal>
          <Dialog.Overlay style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            position: 'fixed', 
            inset: 0,
            animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
          <Dialog.Content style={{ 
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '450px',
            maxHeight: '85vh',
            padding: '25px',
            animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <Dialog.Title>
              <Text size="5" weight="bold">座席情報: {seat.id}</Text>
            </Dialog.Title>
            
            <Flex direction="column" gap="3" style={{ marginTop: '20px' }}>
              <Flex gap="3" align="center">
                <Text weight="bold">状態:</Text>
                <Badge size="2" color={getSeatStatusColor(seat.status)}>
                  {getSeatStatusText(seat.status)}
                </Badge>
              </Flex>
              
              {seat.user && (
                <Flex gap="3" align="center">
                  <Text weight="bold">利用者:</Text>
                  <Text>{seat.user}</Text>
                </Flex>
              )}
              
              <Text weight="bold" style={{ marginTop: '10px' }}>状態を変更:</Text>
              <Flex gap="2" wrap="wrap">
                <Button 
                  color="green" 
                  variant="soft"
                  disabled={seat.status === "unavailable"}
                  onClick={() => onStatusChange(seat, "available")}
                >
                  空席にする
                </Button>
                <Button 
                  color="amber" 
                  variant="soft"
                  disabled={seat.status === "unavailable"}
                  onClick={() => onStatusChange(seat, "reserved")}
                >
                  予約する
                </Button>
                <Button 
                  color="tomato" 
                  variant="soft"
                  disabled={seat.status === "unavailable"}
                  onClick={() => onStatusChange(seat, "occupied")}
                >
                  使用する
                </Button>
              </Flex>
            </Flex>
            
            <Dialog.Close asChild>
              <Button variant="soft" color="gray" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                閉じる
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Popover.Root>
  );
}
