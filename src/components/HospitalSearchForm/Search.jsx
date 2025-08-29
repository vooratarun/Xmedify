import { MenuItem, Select, Button, InputAdornment, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const [states, setStates] = useState([])

    const [cities, setCities] = useState([])

    const [formData, setFormData] = useState({
        state: '',
        city: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        setFormData(prev => ({ ...prev, [name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.state != '' && formData.city != '') {
            navigate(`/search?state=${formData.state}&city=${formData.city}`)
        }
    }

    // Get all states
    useEffect(() => {

        const getStates = async () => {
            try {
                const data = await axios.get('https://meddata-backend.onrender.com/states');
                setStates(data.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        getStates()

    }, [])

    // Get cities
    useEffect(() => {
        const getCities = async () => {
            setCities([])
            setFormData(prev => ({ ...prev, city: '' }))
            try {
                const data = await axios.get(`https://meddata-backend.onrender.com/cities/${formData.state}`)
                setCities(data.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        if (formData.state != "") {
            getCities()
        }

    }, [formData.state])

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                gap: { xs: 2, md: 4 },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', md: 'row' },

            }}
        >

            <Select
                displayEmpty
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                required
                sx={{ minWidth: 200, width: '100%' }}
            >
                <MenuItem disabled value="" selected>State</MenuItem>
                {states.length > 0 && states.map(state => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
            </Select>

            <Select
                displayEmpty
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                required
                sx={{ minWidth: 200, width: '100%' }}
            >
                <MenuItem disabled value="" selected>City</MenuItem>
                {cities.length > 0 && cities.map(city => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
            </Select>

            <Button
                id="searchBtn"
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                sx={{ py: '15px', px: 8, flexShrink: 0 }}
                disableElevation
            >
                Search
            </Button>
        </Box >
    )
}