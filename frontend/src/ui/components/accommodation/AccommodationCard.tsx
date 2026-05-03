import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Accommodation } from '../../../types/accommodation';
import { useNavigate } from 'react-router';

interface AccommodationCardProps {
    accommodation: Accommodation
}

const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardContent>
                <Typography variant='h5'>{accommodation.name}</Typography>
                <Typography variant='body2' sx={{ textAlign: 'left' }}>{accommodation.numRooms} rooms(s) available</Typography>
                <Typography variant='body2' sx={{ textAlign: 'left' }}>{accommodation.rented ? 'rented' : 'not rented'}</Typography>
                <Typography variant='body2' sx={{ textAlign: 'left' }}>{accommodation.condition} condition</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                    startIcon={<InfoIcon />}
                    onClick={() => navigate(`/accommodations/${accommodation.id}`)}
                >
                    Info
                </Button>
                <Box>
                    <Button startIcon={<EditIcon />} color='warning'>Edit</Button>
                    <Button startIcon={<DeleteIcon />} color='error'>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}

export default AccommodationCard;