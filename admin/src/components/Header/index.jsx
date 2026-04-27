import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



import React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

const Header = () => {
    const [anchorMyAcc, setAnchorMYAcc] = React.useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const handleClickMyAcc= (event) => {
        setAnchorMYAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorMYAcc(null);
    };

    return (
        <header className="w-full h-[50px] pr-7 pl-52 bg-[#f1f1f1] flex items-center justify-between">

            <div className="part1 flex-shrink-0">
                <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)] ">
                    <RiMenu2Line className="text-[18px] !text-[rgba(0,0,0,0.8)]" />
                </Button>
            </div>

            <div className="part2  flex items-center justify-end gap-4">

                <IconButton aria-label="notifications">
                    <StyledBadge badgeContent={4} color="secondary">
                        <FaRegBell />
                    </StyledBadge>
                </IconButton>

                <div className="relative">
                    <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer " onClick={handleClickMyAcc}>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <Menu
                        anchorEl={anchorMyAcc}
                        id="account-menu"
                        open={openMyAcc}
                        onClose={handleCloseMyAcc}
                        onClick={handleCloseMyAcc}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleCloseMyAcc}>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer " >
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="">


                                </div>

                            </div>

                        </MenuItem>
                        <MenuItem onClick={handleCloseMyAcc}>
                             My account
                        </MenuItem>


                    </Menu>

                </div>




            </div>
        </header>
    );
};

export default Header;