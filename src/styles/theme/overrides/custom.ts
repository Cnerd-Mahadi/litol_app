"use client";

import { Stack, styled } from "@mui/material";
import { ROUNDS } from "../rounds";

export const StackRounded = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	borderRadius: ROUNDS.MD,
	boxShadow: theme.themeShadows.md,
	padding: "2rem",
}));
