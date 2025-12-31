import { Card, Flex, Text, Badge } from "@radix-ui/themes";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Award,
  Briefcase,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: "users" | "calendar" | "dollar" | "award" | "briefcase";
  color?: "blue" | "green" | "red" | "purple" | "orange" | "cyan";
}

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = "blue",
}: KpiCardProps) {
  const getIcon = () => {
    const iconProps = {
      className: "w-4 h-4 sm:w-5 sm:h-5",
      strokeWidth: 2,
    };

    switch (icon) {
      case "users":
        return <Users {...iconProps} />;
      case "calendar":
        return <Calendar {...iconProps} />;
      case "dollar":
        return <DollarSign {...iconProps} />;
      case "award":
        return <Award {...iconProps} />;
      case "briefcase":
        return <Briefcase {...iconProps} />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (trend === "up") return "green";
    if (trend === "down") return "red";
    return "gray";
  };

  return (
    <Card
      size="2"
      className="
        transition-transform
        sm:hover:scale-[1.02]
        cursor-pointer
      "
      style={{
        background: "var(--color-panel-solid)",
        border: "1px solid var(--gray-a5)",
      }}
    >
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start" gap="3">
          {/* TEXT */}
          <Flex direction="column" gap="1" className="min-w-0">
            <Text
              className="text-xs sm:text-sm"
              style={{ color: "var(--gray-a11)" }}
              weight="medium"
            >
              {title}
            </Text>

            <Text
              weight="bold"
              className="text-lg sm:text-2xl"
              style={{
                letterSpacing: "-0.02em",
                color: `var(--${color}-11)`,
                wordBreak: "break-word",
              }}
            >
              {value}
            </Text>
          </Flex>

          {/* ICON */}
          {icon && (
            <Flex
              align="center"
              justify="center"
              className="w-9 h-9 sm:w-11 sm:h-11"
              style={{
                borderRadius: "var(--radius-3)",
                background: `var(--${color}-a3)`,
                color: `var(--${color}-11)`,
                flexShrink: 0,
              }}
            >
              {getIcon()}
            </Flex>
          )}
        </Flex>

        {/* TREND + SUBTITLE */}
        {(trend || subtitle) && (
          <Flex gap="2" align="center" wrap="wrap">
            {trend && trendValue && (
              <Badge color={getTrendColor()} radius="full" size="1">
                <Flex gap="1" align="center">
                  {trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs">{trendValue}</span>
                </Flex>
              </Badge>
            )}

            {subtitle && (
              <Text
                className="text-[11px] sm:text-xs"
                style={{ color: "var(--gray-a10)" }}
              >
                {subtitle}
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
