import { Card, Flex, Text, Badge, Grid } from "@radix-ui/themes";
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
    const iconProps = { size: 20, strokeWidth: 2 };
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
      size="3"
      className="hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
      style={{
        background: "var(--color-panel-solid)",
        border: "1px solid var(--gray-a5)",
      }}
    >
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
            <Text size="2" style={{ color: "var(--gray-a11)" }} weight="medium">
              {title}
            </Text>
            <Text
              size="6"
              weight="bold"
              style={{
                letterSpacing: "-0.02em",
                color: `var(--${color}-11)`,
                wordBreak: "break-word",
              }}
            >
              {value}
            </Text>
          </Flex>

          {icon && (
            <Flex
              align="center"
              justify="center"
              style={{
                width: "44px",
                height: "44px",
                minWidth: "44px",
                borderRadius: "var(--radius-3)",
                background: `var(--${color}-a3)`,
                color: `var(--${color}-11)`,
              }}
            >
              {getIcon()}
            </Flex>
          )}
        </Flex>

        {(trend || subtitle) && (
          <Flex gap="2" align="center" wrap="wrap">
            {trend && trendValue && (
              <Badge color={getTrendColor()} radius="full" size="1">
                <Flex gap="1" align="center">
                  {trend === "up" ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {trendValue}
                </Flex>
              </Badge>
            )}

            {subtitle && (
              <Text size="1" style={{ color: "var(--gray-a10)" }}>
                {subtitle}
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
