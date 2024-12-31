import { SegmentedControl } from "@radix-ui/themes";
import { useTheme } from "../main";

export const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();

    return (
        <SegmentedControl.Root defaultValue="dark" onValueChange={(value) => { setTheme(value as 'light' | 'dark' | 'auto') }}>
            <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
            <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
            <SegmentedControl.Item value="auto">Auto</SegmentedControl.Item>
        </SegmentedControl.Root>
    )
}