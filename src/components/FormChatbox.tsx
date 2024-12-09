import { useForm, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, Button, FormControl, FormLabel, FormGroup, FormHelperText, TextField, Radio, Box } from '@mui/material';
import './FormChatBox.css';

const FormChatBox = () => {
    const { control, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = () => {

    };

    return (
        <div className='chat-box-form'>
            <div className='backgroungtitle'>
                <span className='title'>Quý khách vui lòng cho chúng tôi thông tin để thuận tiện hỗ trợ</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl component="fieldset" error={!!errors.title}>
                    <FormLabel component="legend">Quý Danh</FormLabel>
                    <FormGroup>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Please select a title" }}
                            render={({ field }) => (
                                <>
                                    <FormControlLabel
                                        control={<Radio sx={{
                                            '&.Mui-checked': {
                                                color: 'orange',
                                            }
                                        }} {...field} checked={field.value === "Quý ông"} onChange={() => field.onChange("Quý ông")} />}
                                        label="Quý ông"
                                    />
                                    <FormControlLabel
                                        control={<Radio sx={{
                                            '&.Mui-checked': {
                                                color: 'orange',
                                            }
                                        }} {...field} checked={field.value === "Quý bà"} onChange={() => field.onChange("Quý bà")} />}
                                        label="Quý bà"
                                    />
                                </>
                            )}
                        />
                    </FormGroup>
                    {errors.title && <FormHelperText></FormHelperText>}
                </FormControl>
                <Box mb={2}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="* Họ và Tên"
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name ? (errors.name.message as string) : ""}
                                fullWidth
                            />
                        )}
                    />
                </Box>
                <Box mb={2}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="email"
                                label="Email"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email ? (errors.email.message as string) : ""}
                                fullWidth
                            />
                        )}
                    />
                </Box>
                <Box mb={2}>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="tel"
                                label="* Điện Thoại"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Box>
                <FormControl component="fieldset" error={!!errors.needhelp}>
                    <FormLabel component="legend">Bạn cần trợ giúp gì?</FormLabel>
                    <FormGroup>
                        {["Đặt vé", "Phản hồi góp ý dịch vụ", "Thông tin các điểm giao dịch", "Thông tin khởi hành và giá vé", "Yêu cầu hỗ trợ khác"].map(option => (
                            <Controller
                                key={option}
                                name="needhelp"
                                control={control}
                                rules={{ required: "Please select at least one option" }}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Radio sx={{
                                                '&.Mui-checked': {
                                                    color: 'orange',
                                                }
                                            }}
                                                {...field}
                                                // checked={Array.isArray(field.value) && field.value.includes(option)}
                                                // onChange={(e) => {
                                                //     const newValue = e.target.checked
                                                //         ? [...(field.value || []), option]
                                                //         : (field.value || []).filter((val: string) => val !== option);
                                                //     field.onChange(newValue);
                                                // }}
                                                checked={field.value === option}
                                                onChange={() => field.onChange(option)}
                                                value={option}
                                            />
                                        }
                                        label={option}
                                    />
                                )}
                            />
                        ))}
                    </FormGroup>
                    {errors.needhelp && <FormHelperText></FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Bắt đầu trò truyện</Button>
            </form>
        </div>
    );
};

export default FormChatBox;
