<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class ProfileService
{
    public function createProfile(array $data) 
    {
        try {
            $profile = new Profile();
            $profile->fill($data);

            $profile->save();
            return $profile;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi tạo prfile: ' . $e->getMessage());
        }
    }

    public function getProfile()
    {
        
    }


}